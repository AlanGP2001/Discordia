import React, { useState } from 'react'
import { useData } from './PublicacionContext'
import { useAuth } from '../../public/Auth/auth';

import {Input,Textarea,Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";
import {Button, ButtonGroup, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react"



export default function PublicacionCreate() {
  

  const { createPost } = useData();
  const { user} = useAuth();

  const [selectedOption, setSelectedOption] = React.useState(new Set(["evento"]));
  const descriptionsMap = {
    evento:
      "All commits from the source branch are added to the destination branch via a merge commit.",
    publicacion:
      "All commits from the source branch are added to the destination branch as a single commit.",
    rebase: "All commits from the source branch are added to the destination branch individually.",
  };

  const labelsMap = {
    evento: "Publicar como: Evento",
    publicacion: "Publicar como: Publicación",
    rebase: "???????",
  }

  const selectedOptionValue = Array.from(selectedOption)[0];

  const [post, setPost] = useState({
    titulo: "",
    tipo: "evento",
    contenido: "",
    autor: user?.nombre,
    jwt: user?.jwt,
  });

  const handleForm = (e) => {
    
    e.preventDefault();
    createPost(post);

  };

   const handleClick = () => {
    // Realizar alguna acción con el valor de la opción seleccionada
    console.log(`Botón seleccionado: ${selectedOptionValue}`);

    setPost({
      ...post,
      tipo: selectedOptionValue,
     
    });


  };

  return (
    <>
    <div className="flex justify-center flex-col items-center grid-cols-1 gap-3 pt-10">
    <form onSubmit={handleForm}>
    <Card className="max-w-[400px]" >
      <CardHeader className="flex gap-3">
        {/* <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        /> */}
        <div className="flex flex-col">
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Input 
               value={post.titulo}
               type="text" label="Título publicación"
               onChange={(e) => {
                setPost({
                  ...post,
                  titulo: e.target.value,
                  slug: e.target.value.toLowerCase().split(" ").join("-"),
                });
              }} />
              
          </div>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
          <Textarea
            label="Contenido"
            variant="bordered"
            placeholder=":D"
            disableAnimation
            disableAutosize
            classNames={{
              base: "max-w-xs",
              input: "resize-y min-h-[40px]",
            }}
            value={post.contenido}
            onChange={(e) => {
              setPost({
                ...post,
                contenido: e.target.value,
               
              });
            }}
          />
      </CardBody>
      <Divider/>
      <CardFooter>
      <ButtonGroup variant="flat">
      <Button onClick={handleClick}>{labelsMap[selectedOptionValue]}</Button>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button isIconOnly>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
</svg>

          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="Merge options"
          selectedKeys={selectedOption}
          selectionMode="single"
          onSelectionChange={setSelectedOption}
          className="max-w-[300px]"
        >
          <DropdownItem key="evento" description={descriptionsMap["evento"]}>
            {labelsMap["evento"]}
          </DropdownItem>
          <DropdownItem key="publicacion" description={descriptionsMap["publicacion"]}>
            {labelsMap["publicacion"]}
          </DropdownItem>
          <DropdownItem key="rebase" description={descriptionsMap["rebase"]}>
            {labelsMap["rebase"]}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
        <button type="submit">Publicar</button>
      </CardFooter>
    </Card>

    </form>
      
    

    
       
     
      </div>
    </>
  )
}
