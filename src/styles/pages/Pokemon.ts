import Image from "next/image";
import Link from "next/link";
import { styled } from "../index";

export const PokeInfo = styled('div', {
    width: '100vw',
    height: '100vh',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',

    fontSize: '3rem',
    textShadow: '0 0 12px rgb(0 0 0 / 25%)',

    transition: '0.8s ease-in-out',

    div: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
    }
})

export const PokeArrow = styled(Link, {
    fontSize: '10rem',
})

export const PokeInfoImage = styled(Image, {

})

export const PokeInfoType = styled('span', {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '1rem',
    
    fontSize: '1.5rem',
    
    span: {
        width: '100%',
        borderRadius: '20px',
        border: '0.5px solid',
        padding: '0.5rem',
        
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
})