import { useLottie } from "lottie-react";
import emptyBox from '../../assets/animations/emptyBox.json'

export function EmptyBox (){

    const { View } = useLottie({
        animationData: emptyBox,
        loop: false,
        autoplay: true,
        style: { width: 300, height: 300 },
    })


    return (
        <>
            { View } 
        </>
    )
}