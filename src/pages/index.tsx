import { GetServerSideProps, GetStaticProps } from "next";
import React, { useState } from "react";
import Image from "next/image";

import ColorThief from "colorthief";
import {
  PokeContainer,
  PokeCardContainer,
  PokeContainerInside,
  PokemonCardInfo,
  PokemonCardImage,
  PokemonCardInfoType,
  Header,
  TopInfoContainer,
} from "@/styles/pages/Home";

interface PokemonProps {
  pokemons: {
    id: number;
    name: string;
    imgUrl: string;
    url: string;
  }[];
}

import missignoImgUrl from '../assets/MissingNo.png' //'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/MissingNo.svg/1200px-MissingNo.svg.png'

export default function Home({ pokemons }: PokemonProps) {
  const [searchFilter, setSearchFilter] = useState('');

  pokemons = pokemons.filter((e) => e.name.toUpperCase().includes(searchFilter.toUpperCase()) )
  if(pokemons.length == 0){
    pokemons.push({id: 0, name: 'MissingNo.', imgUrl: missignoImgUrl.src, url: '#'})
  }

  console.log(pokemons)

  return (
    <>
      <TopInfoContainer>
        <b>
          The Pokédex is a tool designed to assist trainers on their journey to
          become Pokémon Masters, the Pokédex offers valuable information about
          the characteristics, abilities, and habitats of various Pokémon
          species.
        </b>

        {/* <div>
        {
          pokedex.map(dex => {
            return (
              <Link href={`/${dex.id}`} key={'pokedex-' + dex.id}>{dex.name}</Link>
            )
          })
        }
      </div> */}

        <input
          type="text"
          placeholder="Search for your Pokemon..."
          value={searchFilter}
          onChange={() => setSearchFilter(event.target.value)}
        />
      </TopInfoContainer>

      <PokeContainer>
        <PokeContainerInside>
          {
          pokemons.map((pokemon) => {
            console.log(pokemon)
            return (
              <PokeCardContainer key={pokemon.id} className="pokemonCard">
                <PokemonCardInfo
                  href={`/pokemon/${pokemon.id}`}
                  key={"pokemon-" + pokemon.id}
                >
                  <PokemonCardImage
                    className="image"
                    src={pokemon.imgUrl}
                    alt={"image.alt"}
                    objectFit="cover"
                    objectPosition="top center"
                    width={150}
                    height={150}
                    onLoadingComplete={(e) => {
                      const colorThief = new ColorThief();
                      const color = colorThief.getColor(e);
                      e.parentElement.parentElement.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
                    }}
                  />

                  <span>
                    <p>#{pokemon.id}</p>
                    <h2>{pokemon.name}</h2>
                    <PokemonCardInfoType>
                      <small>Tipo1</small>
                      <small>Tipo2</small>
                    </PokemonCardInfoType>
                  </span>
                </PokemonCardInfo>
              </PokeCardContainer>
            );
          })}
        </PokeContainerInside>
      </PokeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151`
  );
  const poke = await res.json();

  const res2 = await fetch(`https://pokeapi.co/api/v2/pokedex/`);
  const dex = await res2.json();

  const pokemons = poke.results.map((pokemon) => {
    let id = pokemon.url
      .replace("https://pokeapi.co/api/v2/pokemon/", "")
      .replace("/", "");

    let imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

    return {
      id: id,
      name: capitalizeFirstLetter(pokemon.name),
      imgUrl: imgUrl,
      url: pokemon.url,
    };
  });

  const pokedex = dex.results.map((dex) => {
    let id = dex.url
      .replace("ttps://pokeapi.co/api/v2/pokedex/", "")
      .replace("/", "");

    return {
      name: dex.name,
      id: id,
      url: dex.url,
    };
  });

  return {
    props: {
      pokemons,
      pokedex,
    },
    revalidate: 60 * 60 * 2, // 2 horas
  };
};
