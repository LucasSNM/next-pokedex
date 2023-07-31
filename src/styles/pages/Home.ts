import { styled } from "../index";
// import Image from "next/image";

export const PokeContainer = styled(`div`, {
    Width: "100%",
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#f6f7ff',
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
    borderRadius: '20px',
    // display: 'flex',
    // justifyContent: 'center',
    // flexDirection: 'column',
    // alignItems: 'center',
    // transform: 'translateX(2rem)',
    opacity: '1',

    transition: '0.2s ease-in-out',
    
    ':hover &': {
        opacity: '0.7',
    },

    '&:hover': {
        opacity: '1',
        cursor: 'pointer',
    },
    
    div: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '15rem',
        height: '100%',
        // flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'nowrap',
        transform: 'translateX(-1rem)',
        
    },
    span: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        textShadow: '0 0 12px rgb(0 0 0 / 25%)',
    },

    Image: {
        
    }
})

