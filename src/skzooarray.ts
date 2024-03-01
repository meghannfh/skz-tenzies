import puppym from "./assets/puppym.png";
import foxyny from "./assets/foxyny.png";
import bbokari from "./assets/bbokari.png";
import hanquokka from "./assets/quokka.png";
import jiniret from "./assets/jiniret.png";
import dwaekki from "./assets/dwaekki.png";
import leebit from "./assets/leebit.png";
import wolfchan from "./assets/wolfchan.png";

export type Member = {
    charName: string,
    characterURL: string
}

const members: Member[] = [
    {
        charName: "foxyny",
        characterURL: foxyny
    },
    {
        charName: "puppym",
        characterURL: puppym
    },
    {
        charName: "bbokari",
        characterURL: bbokari
    },
    {
        charName: "hanquokka",
        characterURL: hanquokka
    },
    {
        charName: "jiniret",
        characterURL: jiniret
    },
    {
        charName: "dwaekki",
        characterURL: dwaekki
    },
    {
        charName: "leebit",
        characterURL: leebit
    },
    {
        charName: "wolfchan",
        characterURL: wolfchan
    }
]

export default members;