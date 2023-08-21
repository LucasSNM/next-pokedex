import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import React, { useState } from "react";
import Image from "next/image";

import ColorThief from "colorthief";
import {
  PokeContainer,
  PokeCardContainer,
  PokeContainerInside,
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

import missignoImgUrl from '../../assets/MissingNo.png'
import Link from "next/link";

export default function Home({ pokemons }: PokemonProps) {
  const [searchFilter, setSearchFilter] = useState('');

  // const pokeSpeciesSort = pokeSpecies.sort((a,b) => {a.url - b.url})
  pokemons = pokemons.sort((a,b) => {return a.id - b.id})
  pokemons = pokemons.filter((e) => e.name.toUpperCase().includes(searchFilter.toUpperCase()) )
  if(pokemons.length == 0){
    pokemons.push({id: 0, name: 'MissingNo.', imgUrl: missignoImgUrl.src, url: '#'})
  }

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
          onChange={(e) => setSearchFilter(e.currentTarget.value)}
        />
      </TopInfoContainer>

      <PokeContainer>
        <PokeContainerInside>
          {
          pokemons.map((pokemon) => {
            return (
              <PokeCardContainer key={pokemon.id} className="pokemonCard">
                <Link
                  className='info'
                  href={`../pokemon/${pokemon.id}`}
                  key={"pokemon-" + pokemon.id}
                >
                  <Image
                    className="image"
                    src={pokemon.imgUrl}
                    alt={"image.alt"}
                    // objectFit="cover"
                    // objectPosition="top center"
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
                    <div className="type">
                      <small>Tipo1</small>
                      <small>Tipo2</small>
                    </div>
                  </span>
                </Link>
              </PokeCardContainer>
            );
          })}
        </PokeContainerInside>
      </PokeContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "1" } }],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const generationId = params.id;
  const res = await fetch(
    `https://pokeapi.co/api/v2/generation/${generationId}`
  );
  const poke = await res.json();
  const pokeSpecies = poke.pokemon_species


  const pokemons = pokeSpecies.map((pokemon) => {
    let id = pokemon.url
      .replace("https://pokeapi.co/api/v2/pokemon-species/", "")
      .replace("/", "");

    let imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

    return {
      id: id,
      name: capitalizeFirstLetter(pokemon.name),
      imgUrl: imgUrl,
      url: pokemon.url,
    };
  });


  return {
    props: {
      pokemons,
    },
    revalidate: 60 * 60 * 2, // 2 horas
  };
};
