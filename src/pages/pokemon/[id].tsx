import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import ColorThief from "colorthief";
import { PokeArrow, PokeInfo, PokeInfoType } from "@/styles/pages/Pokemon";
import Link from "next/link";

interface PokemonDetailsProps {
  pokemon: {
    id: number;
    name: string;
    imgUrl: string;
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
      <PokeArrow href={`/pokemon/${pokemon.id > 1 ? pokemon.id - 1 : pokemon.id}`}>
        {"<"}
      </PokeArrow>
      <Image
        className="image"
        src={pokemon.imgUrl}
        alt={"image.alt"}
        width={700}
        height={700}
        onLoadingComplete={(e) => {
          const colorThief = new ColorThief();
          const color = colorThief.getColor(e);
          e.parentElement.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
        }}
      />
      <div>
        #{pokemon.id}
        <p>{pokemon.name}</p>
        <span>
          <p>Height: {(parseFloat(pokemon.height) * 0.1).toFixed(2)} m</p>
          <p>Weight: {(parseFloat(pokemon.weight) * 0.1).toFixed(2)} kg</p>
        </span>
        <PokeInfoType>
          {pokemon.type.map((e) => {
            return <span key={e.type.name}>{capitalizeFirstLetter(e.type.name)}</span>;
          })}
        </PokeInfoType>
      </div>
      <PokeArrow href={`/pokemon/${pokemon.id + 1}`}>{">"}</PokeArrow>
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

  return {
    props: {
      pokemon: {
        id: pokemon.id,
        name: capitalizeFirstLetter(pokemon.name),
        imgUrl: imgUrl,
        height: pokemon.height,
        weight: pokemon.weight,
        type: pokemon.types,
      },
    },
    // revalidate: 60 * 60 * 2, // 2 horas
  };
};
