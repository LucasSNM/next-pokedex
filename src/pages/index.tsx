import { GetServerSideProps, GetStaticProps } from "next";
import React from "react";
import Image from "next/image";


import ColorThief from "colorthief";
import { PokeContainer, PokeCardContainer, PokeContainerInside, PokemonCardInfo, PokemonCardImage } from "@/styles/pages/Home";
import Link from "next/link";

interface PokemonProps {
  pokemons: {
    id: number;
    name: string;
    color: any;
    imgUrl: string;
    url: string;
  }[];
}

interface pokemonColor {
  id: number;
  color: string;
}
[];

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Loading = () => <div>Loading...</div>;

export default function Home({ pokemons }: PokemonProps) {

  return (
    <PokeContainer>
      <PokeContainerInside>

      {pokemons.map((pokemon) => {
        
        return (
          <PokeCardContainer
            key={pokemon.id}
            className="pokemonCard"
            >

            <PokemonCardInfo href={`/pokemon/${pokemon.id}`} key={pokemon.id}>


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
                  {capitalizeFirstLetter(pokemon.name)}
                </h2>
                <p> 
                  <p>Tipo1</p>
                  <p>Tipo2</p>
                </p>
              </span>
            </PokemonCardInfo>

          </PokeCardContainer>
        );
      })}
      </PokeContainerInside>
    </PokeContainer>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=500`
  );
  const poke = await res.json();



  const pokemons = await Promise.all(
    poke.results.map(async (pokemon) => {
      let id = pokemon.url
        .replace("https://pokeapi.co/api/v2/pokemon/", "")
        .replace("/", "");

      let imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

      return {
        id: id,
        name: pokemon.name,
        imgUrl: imgUrl,
        url: pokemon.url,
      };
    })
  );

  return {
    props: {
      pokemons,
    },
    revalidate: 60 * 60 * 2, // 2 horas
  };
};
