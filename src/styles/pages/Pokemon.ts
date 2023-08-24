import Image from "next/image";
import Link from "next/link";
import { styled } from "../index";

export const PokeInfo = styled("div", {
  width: "100%",
  
  fontSize: "3rem",
  lineHeight: 'normal',

  textShadow: "0 0 12px rgb(0 0 0 / 25%)",
  
  transition: "0.5s ease-in-out",
  
  '.top': {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  // --------------------------------------------------------------
  // iPads and Tablets – 481px — 768px
  "@media screen and (max-width: 767px) ": {

    '.top': {
        flexDirection: "column",
    },

    ".image": {
      zIndex: 1,
      width: "80%",
      height: "80%",
    },
  },
  // Laptops and small screen – 769px — 1024px
  "@media screen and (min-width: 768px) ": {

    '.top': {
        flexDirection: "column",
    },

    ".image": {
      zIndex: 1,
      width: "70%",
      height: "70%",
    },
  },
  // Large screens and Desktops – 1025px — 1200px
  "@media screen and (min-width: 992px) ": {

    '.top': {
        flexDirection: "row",
    },

    ".image": {
      zIndex: 1,
      width: "50%",
      height: "50%",
    },
  },
  // TV and Extra Large Screens – 1201px and more
  "@media screen and (min-width: 1200px) ": {

    '.top': {
        flexDirection: "row",
    },


    ".image": {
      zIndex: 1,
      width: "50%",
      height: "50%",
    },
  },
  // --------------------------------------------------------------

//   div: {
//     height: "100%",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "space-evenly",
//     alignItems: "flex-start",
//   },

  small: {
    textWrap: "nowrap",
  },

  // --------------------------------------------------------------
  ".type": {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: "1rem",

    fontSize: "1.5rem",

    span: {
      width: "100%",
      borderRadius: "20px",
      border: "0.5px solid",
      padding: "0.5rem",

      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  // --------------------------------------------------------------
  ".arrow": {
    fontSize: "10rem",
    position: "absolute",
    top: "50%",
    zIndex: 2,
  },

  ".arrowRight": {
    right: "2rem",
  },

  ".arrowLeft": {
    left: "2rem",
  },
  // --------------------------------------------------------------
  // --------------------------------------------------------------
  ".information": {
    marginTop: "2rem",
    padding: "2rem",
    width: "100%",
    height: '200vh',
    backgroundColor: '#f6f7ff',
    borderRadius: "100px 100px 0 0",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: 'space-between',

    color: '$gray900',
  },
  // --------------------------------------------------------------
});
