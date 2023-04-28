import { Spacer, Text, useTheme } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';

export const Navbar = () => {
	const { theme } = useTheme();

	return (
		<div
			style={{
				cursor: 'auto',
				display: 'flex',
				width: '100%',
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'start',
				padding: '0x 20px',
				backgroundColor: theme?.colors.gray900.value,
			}}
		>
			<Link href='/'>
				<div
					style={{
						cursor: 'pointer',
						display: 'flex',
						alignItems: 'center',
					}}
				>
					<Image
						width={70}
						height={70}
						src={
							'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png'
						}
						alt='Icono pokemon'
					/>
					<Text color='white' h2>
						P
					</Text>
					<Text color='white' h3>
						okémon
					</Text>
				</div>
			</Link>
			<Spacer css={{ flex: 1 }} />
			<Link href='/favorites'>
				<Text
					css={{
						cursor: 'pointer',
					}}
					color='white'
					h3
				>
					Favoritos
				</Text>
			</Link>
		</div>
	);
};
