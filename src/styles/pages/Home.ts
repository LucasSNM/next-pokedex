import Link from "next/link";
import { styled } from "../index";
import Image from "next/image";

export const Header = styled('div', {
    width: '100vw',
    margin: '0 auto',
    marginBottom: '2.5rem',

    backgroundColor: 'rgb(255,255,255)',
    backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,1) 15%, rgba(246,12,82,1) 100%)',
})

export const PokeContainer = styled(`div`, {
    Width: "100%",
    display: 'flex',
    justifyContent: 'center',
    overflow: 'hidden',
})

export const PokeContainerInside = styled(`div`, {
    width: '90%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',
    gap: '1.5rem',
})

export const PokeCardContainer = styled(`div`, {
    width: 300,
    height: 125,
    borderRadius: '20px',
    transition: '0.2s ease-in-out',
    
    span: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'flex-end',
        textShadow: '0 0 12px rgb(0 0 0 / 25%)',

    },
})

export const PokemonCardInfo = styled(Link, {
    padding: '0 1rem',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'nowrap',
    alignItems: 'center',
    // flexDirection: 'row',
    // border: '1px solid red',

    transition: '0.4s ease-in-out',

    ':hover &': {
        // opacity: '0.7',
    },

    '&:hover': {
        opacity: '1',
        cursor: 'pointer',
    },
})

export const PokemonCardImage = styled(Image, {
    transform: 'translateX(-2.5rem)',
})

export const PokemonCardInfoType = styled('div',{
    display: 'flex',
    gap: '1rem',
    width: '100%',
})