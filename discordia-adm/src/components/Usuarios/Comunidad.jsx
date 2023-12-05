import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Avatar } from "@nextui-org/react";
import { useData } from '../Publicaciones/PublicacionContext';

// Function to shuffle an array in-place using Fisher-Yates algorithm
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

export default function Comunidad() {
    const [comunidad, setComunidad] = useState([]);
    const { getComunidad } = useData();
    const [imagenes] = useState([
        'https://wallpapercave.com/wp/wp8608440.jpg',
        'https://www.seekpng.com/png/full/10-103647_minecraft-creeper-face-icons-png-minecraft-creeper-head.png',
        'https://www.fractalcamo.com/uploads/5/9/0/2/5902948/s189772745713394276_p7007_i154_w1500.jpeg',
        'https://i.pinimg.com/originals/d0/57/f6/d057f68ea8045b4cfe004ad4b79cc8a2.png',
        'https://mystickermania.com/cdn/stickers/anime/demon-slayer-nezuko-kamado-512x512.png'
    ]);

    const [shuffledImagenes, setShuffledImagenes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const Comunidad = await getComunidad();
                setComunidad(Comunidad);
            } catch (error) {
                console.error("Error al obtener data comunidad:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        setShuffledImagenes(shuffleArray(imagenes));
    }, [imagenes]);

    const [isFollowed, setIsFollowed] = React.useState(false);

    return (
        <>
            {comunidad !== null ? (
                <div>
                    {comunidad.map((item, index) => (
                        <div key={item.id} className='grid gap-4 md:grid-cols-2 lg:grid-cols-3  justify-items-center pt-10 '>
                            <Card className="max-w-[340px]">
                                <CardHeader className="justify-between">
                                    <div className="flex gap-5">
                                        <Avatar isBordered radius="full" size="md" src={shuffledImagenes[index]} />
                                        <div className="flex flex-col gap-1 items-start justify-center">
                                            <h4 className="text-small font-semibold leading-none text-default-600">{item.user}</h4>
                                            <h5 className="text-small tracking-tight text-default-400">@{item.user}Oficial</h5>
                                        </div>
                                    </div>
                                    {/* Rest of your CardHeader component code */}
                                </CardHeader>
                                <CardBody className="px-3 py-0 text-small text-default-400">
                                    {item.detalle === "" ? (
                                        <p>
                                            🌟 ¡Bienvenido a nuestra comunidad! 👋 Parece que alguien aún no ha compartido sus gustos, pasatiempos y temas de interés. ¡Anímate a completar tu perfil y sé parte activa de la diversión! 🚀
                                        </p>
                                    ) : (
                                        <p>{item.detalle}</p>
                                    )}
                                    {/* Rest of your CardBody component code */}
                                </CardBody>
                                <CardFooter className="gap-3">
                                    {/* Rest of your CardFooter component code */}
                                </CardFooter>
                            </Card>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    <p>No data available.</p>
                </div>
            )}
        </>
    );
}
