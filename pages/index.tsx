import { pokeApi } from '@/api';
import { Layout } from '@/components/layouts';
import { PokemonCard } from '@/components/pokemon';
import { PokemonListResponse, SinglePokemon } from '@/interfaces';
import { Grid } from '@nextui-org/react';
import { NextPage } from 'next';

interface Props {
	pokemons: SinglePokemon[];
}

const Home: NextPage<Props> = ({ pokemons }) => {
	return (
		<>
			<Layout title='Listado de pokemons'>
				<Grid.Container gap={1} justify='flex-start' direction='row'>
					{pokemons.map((pokemon) => (
						<PokemonCard key={pokemon.id} pokemon={pokemon} />
					))}
				</Grid.Container>
			</Layout>
		</>
	);
};

import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async (ctx) => {
	const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

	const pokemons: SinglePokemon[] = data.results.map((poke, i) => ({
		...poke,
		id: i + 1,
		img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
			i + 1
		}.svg`,
	}));

	return {
		props: { pokemons },
	};
};

export default Home;
