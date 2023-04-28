import { pokeApi } from '@/api';
import { Layout } from '@/components/layouts';
import { Pokemon, PokemonListResponse } from '@/interfaces';
import { localFavorites } from '@/utils';
import { Grid, Card, Text, Button, Container } from '@nextui-org/react';
import { GetStaticProps, NextPage, GetStaticPaths } from 'next';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import heartIcon from '../../public/images/heart-icon.svg';

interface Props {
	pokemon: Pokemon;
}

const PokemonPageName: NextPage<Props> = ({ pokemon }) => {
	const [savedPokemon, setSavedPokemon] = useState<boolean>();

	useEffect(() => {
		setSavedPokemon(localFavorites.isFavorite(pokemon.name));
	}, []);

	const onToggleFavorite = () => {
		setSavedPokemon(!savedPokemon);
		localFavorites.toggleFavorite(pokemon.name);
		localFavorites.isFavorite(pokemon.name)
			? confetti({
					zIndex: 999,
					particleCount: 100,
					spread: 160,
					angle: -100,
					origin: {
						x: 1,
						y: 0,
					},
			  })
			: '';
	};

	return (
		<Layout title={pokemon.name}>
			<Grid.Container css={{ marginTop: '5px' }} gap={2}>
				<Grid xs={12} sm={4}>
					<Card hoverable css={{ padding: '30px' }}>
						<Card.Body>
							<Card.Image
								src={
									pokemon.sprites.other?.dream_world.front_default ||
									'/no-image.png'
								}
								alt={pokemon.name}
								width='100%'
								height={200}
							/>
						</Card.Body>
					</Card>
				</Grid>
				<Grid xs={12} sm={8}>
					<Card>
						<Card.Header
							css={{ display: 'flex', justifyContent: 'space-between' }}
						>
							<Text h1 transform='capitalize'>
								{pokemon.name}
							</Text>
							<Button onClick={onToggleFavorite} color='gradient' ghost>
								{savedPokemon ? (
									<Image alt='Liked' src={heartIcon} height={20} width={20} />
								) : (
									'Guardar en favoritos'
								)}
							</Button>
						</Card.Header>

						<Card.Body>
							<Text size={30}>Sprites:</Text>
							<Container direction='row' display='flex'>
								<Image
									src={pokemon.sprites.front_default}
									alt={`Foto de ${pokemon.name} front_default`}
									width={100}
									height={100}
								/>
								<Image
									src={pokemon.sprites.back_default}
									alt={`Foto de ${pokemon.name} back_default`}
									width={100}
									height={100}
								/>
								<Image
									src={pokemon.sprites.front_shiny}
									alt={`Foto de ${pokemon.name} front_shiny`}
									width={100}
									height={100}
								/>
								<Image
									src={pokemon.sprites.back_shiny}
									alt={`Foto de ${pokemon.name} back_shiny`}
									width={100}
									height={100}
								/>
							</Container>
						</Card.Body>
					</Card>
				</Grid>
			</Grid.Container>
		</Layout>
	);
};

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
	const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
	const pokemonsNames = data.results.map((poke) => `${poke.name}`);
	return {
		paths: pokemonsNames.map((name) => ({
			params: { name },
		})),
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { name } = params as { name: string };
	const { data } = await pokeApi.get<Pokemon>(`/pokemon/${name}`);

	return {
		props: {
			pokemon: {
				id: data.id,
				sprites: {
					front_default: data.sprites.front_default,
					back_default: data.sprites.back_default,
					front_shiny: data.sprites.front_shiny,
					back_shiny: data.sprites.back_shiny,
					other: {
						dream_world: {
							front_default: data.sprites.other?.dream_world.front_default,
						},
					},
				},
				name: data.name,
			},
		},
	};
};

export default PokemonPageName;
