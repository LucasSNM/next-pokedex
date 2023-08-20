import Link from "next/link";
import { styled } from "../index";
import Image from "next/image";

import logoImg from '../../assets/pokeball.svg'


export const Header = styled(Link, {
    width: '55vw',
    height: '20rem',

    backgroundImage: `url(${logoImg.src})`,
    backgroundRepeat: 'no-repeat',
    backgroundPositionX: 'center',
    backgroundPositionY: 'bottom',
    backgroundSize: 'cover',

    // padding: '0px 10rem',
    // opacity: '0.3',

    maskImage: 'linear-gradient(black, transparent)',

    position: 'absolute',
    top: '0px',

    zIndex: 0,

    display: 'flex',
    justifyContent: 'center',
    color: '$gray900',

    Image: {
        opacity: '1',
    },
})

export const Footer = styled('footer', {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '$gray100',
    color: '$gray900',

    fontStyle: 'bold',
})

export const PokeContainer = styled(`div`, {
    Width: "100%",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
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
    transition: '0.6s ease-in-out',
    
    span: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'flex-end',
        textShadow: '0 0 12px rgb(0 0 0 / 25%)',
    },

    '.info': {
        padding: '0 1rem',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'nowrap',
        alignItems: 'center',
        // flexDirection: 'row',
        // border: '1px solid red',
        
        transition: '0.6s ease-in-out',
        
        ':hover &': {
            // opacity: '0.7',
        },
        
        '&:hover': {
            opacity: '1',
            cursor: 'pointer',
        },
        
        '.image': {
            transform: 'translateX(-2.5rem)',
        },
        
        '.type': {
            display: 'flex',
            gap: '1rem',
            width: '100%',
        }
    }
    
})

export const TopInfoContainer = styled(`div`, {
    color: `$gray900`,
    margin: '10rem 5rem 2rem 5rem',
    zIndex: 1,

    fontSize: '1.5rem',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    
    input: {
        margin: '1rem 0',
        maxWidth: '1000px',
        width: '100%',
        padding: '1rem',
        fontSize: '1.8rem',
        backgroundColor: '$gray100',
        borderColor: '$gray500',
        borderRadius: '8px',
        border: 'none',
        color: '$gray500',
        opacity: '0.8',
    }
})