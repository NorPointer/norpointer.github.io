import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/secondpage/')({
  component: RouteComponent,
})

const getPokemon = async (pokeNumber: number) => {
  const baseUrl = "https://pokeapi.co/api/v2/pokemon"
  let response = await fetch(`${baseUrl}/1`)
  if (!response.ok)
  {
    throw Error("FUCK")
  }
  let json = await response.json()
  console.log(json)
}

function RouteComponent() {
  getPokemon(1)
  return <div>Oles page!</div>
}
