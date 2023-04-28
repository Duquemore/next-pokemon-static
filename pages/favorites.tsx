import { Layout } from '@/components/layouts';
import { Container, Grid, Text } from '@nextui-org/react';
import Image from 'next/image';
import pikachuSad from '/public/images/pikachu-sad.webp';
import { PokemonCard } from '@/components/pokemon';
import { pokeApi } from '@/api';
import { PokemonListResponse, SinglePokemon } from '@/interfaces';
import { GetStaticProps, NextPage } from 'next';
import { useEffect, useState } from 'react';
import { localFavorites } from '@/utils';

interface Props {
	pokemons: SinglePokemon[];
}

const Favorites: NextPage<Props> = ({ pokemons }) => {
	const [favoritesPokemons, setFavoritesPokemons] = useState<SinglePokemon[]>(
		[]
	);

	useEffect(() => {
		const regex = /(\d+)/g;
		const favoritePokemons = pokemons
			.filter((poke) => localFavorites.listFavorites().includes(poke.name))
			.map((poke) => ({
				...poke,
				id: Number(poke.url.substring(33, 38).match(regex)),
				img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/
				${poke.url.substring(33, 38).match(regex)}.svg`,
			}));

		setFavoritesPokemons(favoritePokemons);
	}, []);

	return (
		<Layout title='Favorites'>
			<Container
				css={{
					display: 'flex',
					flexDirection: 'column',
					height: 'calc(100vh - 100px',
					alignItems: 'center',
					justifyContent: 'center',
					alignSelf: 'center',
				}}
			>
				{favoritesPokemons.length !== 0 ? (
					<>
						<Text h1>Tus pokemones favoritos</Text>
						<Grid.Container gap={2} justify='flex-start'>
							{favoritesPokemons.map((pokemon) => (
								<PokemonCard key={pokemon.id} pokemon={pokemon} />
							))}
						</Grid.Container>
					</>
				) : (
					<>
						<Text h1>No tienes favoritos</Text>
						<Image alt='Pikachu triste' width={350} src={pikachuSad} />
					</>
				)}
			</Container>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async (ctx) => {
	const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

	return {
		props: { pokemons: data.results },
	};
};

export default Favorites;
