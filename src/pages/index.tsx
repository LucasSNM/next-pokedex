import { GetServerSideProps, GetStaticProps } from "next";
import { useEffect, useState } from "react";
import $ from "jquery";
import ReactDOM from "react-dom";
import React from "react";
import { average, prominent } from "color.js";
import { ColorExtractor } from "react-color-extractor";
import NextImage from "next/image";
import { getPlaiceholder } from "plaiceholder";

import ColorThief from "colorthief";
import useImageColor from 'use-image-color'
// import { Image } from 'use-image-color'

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

// const getImages = async (pattern: string) =>
//   Promise.all(
//     glob.sync(pattern).map(async (file) => {
//       const src = file.replace("./public", "");
//       const buffer = await fs.readFile(file);

//       const {
//         metadata: { height, width },
//         ...plaiceholder
//       } = await getPlaiceholder(buffer);

//       return { ...plaiceholder, img: { src, height, width } };
//     })
//   );
const Loading = () => <div>Loading...</div>;

export default function Home({ pokemons }: PokemonProps) {
  const [pokemonColor, setPokemonColor] = useState<pokemonColor[]>();

  // const [color, setColor] = useState<string>();
  // const [pokemonColor, setPokemonColor] = useState(
  //   colorPoke
  // );

  useEffect(() => {
    let list = [];

    pokemons.map(async (pokemon) => {
      const color = await prominent(pokemon.imgUrl, { format: "hex" }).then(
        (color) => {
          // console.log(`${pokemon.name} - ${color[1]}`);
          return color[1].toString();
        }
      );
      list.push({ id: pokemon.id, color: color });
      // list = {id: pokemon.id, color: color}
      // setPokemonColor([this.pokemonColor, {id: pokemon.id, color: color}]);
      // console.log(pokemonColor);
      setPokemonColor(list);
    });
    // this.myInputRef = React.createRef();
    // myInput.Ref.
    // console.log(list)


  }, []);

  

  // const teste = async (url) => {
  //   const color = await prominent(url, { format: "hex" });
  //   console.log(color[1]);
  //   return color[1];
  // };
  // console.log(pokemonColor)

 
  return (
    <>
      {pokemons.map( (pokemon) => {
        
        // const { colors } = useImageColor("https://live.staticflickr.com/65535/50237066832_72c7290c5c_c.jpg", { cors: true, colors: 5 })
        // let test = ''
        // prominent(pokemon.imgUrl, { format: 'hex' }).then(
        //   color => {
        //     console.log(`${pokemon.name} - ${color[1]}`)
        //     return color[1]
        //   }
        // )
        // let color = prominent(pokemon.imgUrl, { format: 'hex' }).then(
        //   color => { return color[1]}
        // )

        // const images = await getImages(pokemon.imgUrl);
              // <Color src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png`} crossOrigin="anonymous" format="hex">
              //   {({ data, loading, error }) => (
              //     <div style={{ color: data }}>
              //       Text with the predominant color
              //     </div>
              //   )}
              // </Color>



        return (
          <div
            key={pokemon.id}
            className="pokemonCard"
            // style={{
            //   backgroundColor: color,
            // }}
          >

          <NextImage
            className="image"
            src={pokemon.imgUrl}
            alt={'image.alt'}
            // layout="fill"
            objectFit="cover"
            objectPosition="top center"
            // placeholder="blur"
            // blurDataURL="/images/blur.jpg"
            width={300}
            height={300}
            onLoadingComplete={(e) => {
              const colorThief = new ColorThief()
              const color = colorThief.getColor(e)
              console.log(color)

              // e.style.backgroundColor =`rgb(${color[0]}, ${color[1]}, ${color[2]})`
              // e.style.width= '100%'
              e.parentElement.style.backgroundColor =`rgb(${color[0]}, ${color[1]}, ${color[2]})`
            }}
          />
            
            {/* <Color src={"https://live.staticflickr.com/65535/50237066832_72c7290c5c_c.jpg"} crossOrigin="anonymous" format="hex">
              {({ data, loading }) => {
                if (loading) return <Loading />;
                return (
                  <div>
                    Predominant color: <strong>{data}</strong>
                  </div>
                );
              }}
            </Color> */}

            {/* <img src={pokemon.imgUrl}  /> */}
            {/* <Image src={pokemon.imgUrl} thumbnail={pokemon.imgUrl}   /> */}
                  

            {/* <ColorExtractor getColors={this.getColors}> */}
            {/* </ColorExtractor> */}
            {/* {pokemonColor.filter(e => pokemon.id == e.id)} */}
            {/* {pokemonColor.find(e => e.id)} */}

            {/* {pokemonColor.map((value) => {
              if (value.id === pokemon.id) {
                return value.color
                // <div key={'color-'+e.id}>{e.color}</div>;
              }
            })
            } */}

            {
              // JSON.stringify(pokemonColor.find((car) => car.id === 5))
            }

            {/* {JSON.stringify(pokemonColor.find((e) => e.id == pokemon.id))} */}

            <h1>
              {pokemon.color} -
              {pokemon.id} - {pokemon.name}
            </h1>
          </div>
        );
      })}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20`
  );
  const poke = await res.json();



  const pokemons = await Promise.all(
    poke.results.map(async (pokemon) => {
      let id = pokemon.url
        .replace("https://pokeapi.co/api/v2/pokemon/", "")
        .replace("/", "");

      let imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

      // const src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png";
      // const buffer = await fetch(imgUrl).then(async (res) =>
      //   Buffer.from(await res.arrayBuffer())
      // );
      // const { color } = await getPlaiceholder(buffer);

      
    // const img = resolve(process.cwd(), 'rainbow.png');

    
    // img.onload = () => {
      // const colorThief = new ColorThief();
      // const colorPalette = colorThief.getPalette(img, 6);
      // const color = colorThief.getColor(imgUrl)
      // };

      // const img = new Image()
      // img.src = imgUrl;
      // const color = ColorThief.getColor(img)

      const color = ''

      // const img = new Image()
      // const MyImage = (props) => {
      //   return (
      //     <NextImage
      //       src={imgUrl}
      //       alt="Picture of the author"
      //       // width={"350px"}
      //       // height={"300px"}
      //     />
      //   )
      // }
      // // img.src = 'https://live.staticflickr.com/65535/50237066832_72c7290c5c_c.jpg';
      // const color = JSON.stringify(ColorThief.getColor(MyImage))


      // const img = resolve(process.cwd(), 'rainbow.png');

      // await prominent(imgUrl, { format: 'hex' }).then(
      //   color => color[1]
      // )
      // let color2 = JSON.stringify(color)
      // <ColorExtractor src={pokemon.imgUrl} getColors={colors => color = colors[0].toString()} />
      // <ColorExtractor src={pokemon.imgUrl} getColors={colors => this.setState({ colors: colors })} />

      // <Color src={"https://live.staticflickr.com/65535/50237066832_72c7290c5c_c.jpg"} crossOrigin="anonymous" format="hex">
      //   {({ data, loading }) => {
      //     if (loading) return <Loading />;
      //     {color = data.toString()}
      //     console.log(data)
      //     return (
      //       <div>
      //         Predominant color: <strong>{data}</strong>
      //       </div>
      //     );
      //   }}
      // </Color>

      // const { colors } = useImageColor("https://live.staticflickr.com/65535/50237066832_72c7290c5c_c.jpg", { cors: true, colors: 5 })


      return {
        id: id,
        name: pokemon.name,
        color: color,
        imgUrl: imgUrl,
        url: pokemon.url,
      };
    })
    );

  return {
    props: {
      pokemons,
    },
    // revalidate: 60 * 60 * 2, // 2 horas
  };
};
