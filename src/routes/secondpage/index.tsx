import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/secondpage/')({
  component: PockeDexComponent,
})

const getPokemon = async (pokeNumber: number) => {
  const baseUrl = "https://pokeapi.co/api/v2/pokemon"
  const response = await fetch(`${baseUrl}/${pokeNumber}`)
  if (!response.ok)
  {
    throw Error("FUCK")
  }
  const json = await response.json()
  console.log(json)
  return json
}

function PockeDexComponent() {
  const [pokemon, setPokemon] = useState<string>();
  useEffect(() => {
    getPokemon(1).then((value) => setPokemon(JSON.stringify(value)))
  }, [])
  return <div>{pokemon}</div>
}
