import { Alegreya_Sans, Alegreya_Sans_SC } from "next/font/google";
import "./globals.css";

const AlegreyaSans = Alegreya_Sans({ subsets: ["latin"], weight: "400" });
const AlegreyaSansSC = Alegreya_Sans_SC({ subsets: ["latin"], weight: "400" });

export const metadata = {
	title: "Martina Doekharan",
	description: "Generated by create next app",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				className={`${AlegreyaSans.variable} ${AlegreyaSansSC.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
