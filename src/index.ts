import { BskyAgent } from "@atproto/api";
import * as fs from "fs";

import "dotenv/config";

const agent = new BskyAgent({service: "https://bsky.social/"});

async function login() {
	await agent.login({
		identifier: process.env.BSKY_MAIL || "",
		password: process.env.BSKY_PASS || ""
	});
}


async function samstagSkeet() {
	await login();

	const image = fs.readFileSync("./src/assets/SarazarSamstag.jpg");
	const blob = await agent.uploadBlob(image, {encoding: "image/jpeg"});
	await agent.post({
		text: "",
		embed: {
			images: [
				{
					image: blob.data.blob,
					alt: "Hör auf zu labern, es ist Sarazar Samstag"
				}
			],
			$type: "app.bsky.embed.images"
		}
	})
}

samstagSkeet().then(() => {console.log("Skeeted!")});