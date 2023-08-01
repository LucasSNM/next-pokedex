import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import ColorThief from "colorthief";

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

export default function Pokemon({pokemon}: PokemonDetailsProps){

    return(
        <div>
            <Image
                className="image"
                src={pokemon.imgUrl}
                alt={"image.alt"}
                objectFit="cover"
                objectPosition="top center"
                // fill={true}
                width={500}
                height={500}
                onLoadingComplete={(e) => {
                  const colorThief = new ColorThief();
                  const color = colorThief.getColor(e);
                  e.parentElement.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
                }}
              />
            #{pokemon.id}
            <p>{pokemon.name}</p>
            <p>Altura: {pokemon.height}cm</p>
            <p>Peso: {pokemon.weight}</p>
        </div>

    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
      paths: [
        { params: { id: '25' } },
      ],
      fallback: 'blocking',
    }
  }

  export const getStaticProps: GetStaticProps<any, { id: string }> = async ({  params }) => {
    const pokemonId = params.id

    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    );
    const pokemon = await res.json();
  
    let imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
 
    return {
      props: {
        pokemon: {
            id: pokemon.id,
            name: pokemon.name,
            imgUrl: imgUrl,
            height: pokemon.height,
            weight: pokemon.weight,
            type: pokemon.types,
        },
      },
      // revalidate: 60 * 60 * 2, // 2 horas
    };
  };