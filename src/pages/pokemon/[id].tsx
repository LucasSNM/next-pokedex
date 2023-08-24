import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import ColorThief from "colorthief";
import { PokeInfo } from "@/styles/pages/Pokemon";
import Link from "next/link";

interface PokemonDetailsProps {
  pokemon: {
    id: number;
    name: string;
    imgUrl: string;
    imgUrlShiny: string;
    height: string;
    weight: string;
    type: any[];
  };
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function Pokemon({ pokemon }: PokemonDetailsProps) {

  return (
    <PokeInfo key={pokemon.id}>

      <Link className='arrow arrowLeft' href={`/pokemon/${pokemon.id > 1 ? pokemon.id - 1 : pokemon.id}`}>
        {"<"}
      </Link>
      <Link className='arrow arrowRight' href={`/pokemon/${pokemon.id + 1}`}>
        {">"}
      </Link>

      <div className="top">

      <Image
        className="image"
        src={pokemon.imgUrl}
        alt={"image.alt"}
        width={700}
        height={700}
        onLoadingComplete={(e) => {
          const colorThief = new ColorThief();
          const color = colorThief.getColor(e);
          e.parentElement.parentElement.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
        }}
      />

        <div>
          <h4><small>#</small>{pokemon.id}</h4>
          <h1><b>{pokemon.name}</b></h1>
          <span>
            <small>Height: {(parseFloat(pokemon.height) * 0.1).toFixed(2)}m</small>
            <b> | </b> 
            <small>Weight: {(parseFloat(pokemon.weight) * 0.1).toFixed(2)}kg</small>
          </span>
          <div className="type">
            {pokemon.type.map((e) => {
              return <span key={e.type.name}>{capitalizeFirstLetter(e.type.name)}</span>;
            })}
          </div>
        </div>
      </div>

      <div className="information">
          <hr></hr>
          <p>TESTE</p>
      </div>

    </PokeInfo>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "25" } }],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  
  const pokemonId = params.id;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  const pokemon = await res.json();

  let imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
  let imgUrlShiny = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokemonId}.png`;

  return {
    props: {
      pokemon: {
        id: pokemon.id,
        name: capitalizeFirstLetter(pokemon.name),
        imgUrl: imgUrl,
        imgUrlShiny: imgUrlShiny,
        height: pokemon.height,
        weight: pokemon.weight,
        type: pokemon.types,
      },
    },
    // revalidate: 60 * 60 * 2, // 2 horas
  };
};
