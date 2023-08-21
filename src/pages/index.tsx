import { GetServerSideProps, GetStaticProps } from "next";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import ColorThief from "colorthief";
import {
  PokeContainer,
  PokeCardContainer,
  PokeContainerInside,
  TopInfoContainer,
} from "@/styles/pages/Home";

interface PokemonProps {
  pokemonsList: {
    id: number;
    name: string;
    imgUrl: string;
    url: string;
  }[];
}

import missignoImgUrl from "../assets/MissingNo.png"; //'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/MissingNo.svg/1200px-MissingNo.svg.png'
import Link from "next/link";

export default function Home({ pokemonsList }: PokemonProps) {

  const [pokemons, setPokemons] = useState<{id: number, name: string, imgUrl: string, url: string}[]>(pokemonsList)
  const [searchFilter, setSearchFilter] = useState("")
  const lastPokemon = useRef()

  pokemons.sort((a, b) => {
    return a.id - b.id;
  })

  const pokemonsFiltered = pokemons.filter((e) =>
    e.name.toUpperCase().includes(searchFilter.toUpperCase())
  )

  if (pokemonsFiltered.length == 0) {
    pokemonsFiltered.push({
      id: 0,
      name: "MissingNo.",
      imgUrl: missignoImgUrl.src,
      url: "#",
    });
  }

  useEffect(() => {
    if (searchFilter != '') return
    
    const observer = new IntersectionObserver(async ([entry]) => {

      if (lastPokemon && entry.isIntersecting) {
        const newPokemons = await carregaApiPokemons(pokemons.length)
        setPokemons([...pokemons,...newPokemons])

        observer.unobserve(entry.target)
      }
    });
  
    observer.observe(lastPokemon.current);
  }, [pokemons]);

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
          {pokemonsFiltered.map((pokemon) => {
            return (
              <PokeCardContainer 
                key={pokemon.id} 
                className="pokemonCard" 
                ref={() => {if(pokemon.id == pokemons.length - 1) lastPokemon}}
              >
                <Link 
                  href={`/pokemon/${pokemon.id}`}
                  key={"pokemon-" + pokemon.id}
                  className='info'
                >
                  <Image
                    className="image"
                    src={pokemon.imgUrl}
                    alt={"image.alt"}
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

          <input
            type="button"
            value='Exploring for more Pokemons...'
            ref={lastPokemon}
          />
            

        </PokeContainerInside>
      </PokeContainer>
    </>
  );
}

const carregaApiPokemons = async (offset) => {

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=50`
  );
  const poke = await res.json();

  return poke.results.map((pokemon) => {
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

}

export const getStaticProps: GetStaticProps = async () => {

  const pokemonsList = await carregaApiPokemons(0)

  return {
    props: {
      pokemonsList,
    },
    revalidate: 60 * 60 * 2, // 2 horas
  };
};
