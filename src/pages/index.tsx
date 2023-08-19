import { GetServerSideProps, GetStaticProps } from "next";
import React from "react";
import Image from "next/image";


import ColorThief from "colorthief";
import { PokeContainer, PokeCardContainer, PokeContainerInside, PokemonCardInfo, PokemonCardImage, PokemonCardInfoType, Header, TopInfoContainer } from "@/styles/pages/Home";
import Link from "next/link";

import logoImg from '../assets/pokeball.svg'

interface PokemonProps {
  pokemons: {
    id: number;
    name: string;
    color: any;
    imgUrl: string;
    url: string;
  }[];
  pokedex: {
    id: number;
    name: string;
    url: string;
  }[]
}


export default function Home({ pokemons, pokedex }: PokemonProps) {

  return (
    <>


    <TopInfoContainer>

      <h3>
      The Pokédex is a tool that acts as a comprehensive reference guide for the creatures that inhabit the Pokémon world. Designed to assist trainers on their journey to become Pokémon Masters, the Pokédex offers valuable information about the characteristics, abilities, and habitats of various Pokémon species.
      </h3>

      {/* <div>
        {
          pokedex.map(dex => {
            return (
              <Link href={`/${dex.id}`} key={'pokedex-' + dex.id}>{dex.name}</Link>
            )
          })
        }
      </div> */}
    </TopInfoContainer>


    <PokeContainer>
      <PokeContainerInside>

      {pokemons.map((pokemon) => {
        
        return (
          <PokeCardContainer
            key={pokemon.id}
            className="pokemonCard"
            >

            <PokemonCardInfo href={`/pokemon/${pokemon.id}`} key={'pokemon-' + pokemon.id}>

              <PokemonCardImage
                className="image"
                src={pokemon.imgUrl}
                alt={'image.alt'}
                objectFit="cover"
                objectPosition="top center"
                width={150}
                height={150}
                onLoadingComplete={(e) => {
                  const colorThief = new ColorThief()
                  const color = colorThief.getColor(e)
                  e.parentElement.parentElement.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`
                }}
                />

              <span>
                <p>
                  #{pokemon.id}
                </p>
                <h2>
                  {pokemon.name}
                </h2>
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

  const res2 = await fetch(
    `https://pokeapi.co/api/v2/pokedex/`
  );
  const dex = await res2.json();

  const pokemons = 
    poke.results.map((pokemon) => {
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
    })

  const pokedex = dex.results.map(dex => {
    let id = dex.url
        .replace("ttps://pokeapi.co/api/v2/pokedex/", "")
        .replace("/", "");

    return {
      name: dex.name,
      id: id,
      url: dex.url,
    }
  })

  return {
    props: {
      pokemons,
      pokedex,
    },
    revalidate: 60 * 60 * 2, // 2 horas
  };
};
