const fs = require('fs');

import {Keypair} from '@solana/web3.js';






const CONTRACT_AUTHORITY = fs.readFileSync("/Users/davidyaffe/.config/solana/id.json", "utf-8");
const contract_wallet_content = JSON.parse(CONTRACT_AUTHORITY);
export const CONTRACT_AUTHORITY_WALLET = Keypair.fromSecretKey(Uint8Array.from(contract_wallet_content))


const MOD_file = fs.readFileSync("../src/MDRgRNgv77eYKw7L3mJuK5RR8gukz5MYdxVcyUKo9o4.json", "utf-8");
const Mod_content = JSON.parse(MOD_file)
export const MOD = Keypair.fromSecretKey(Uint8Array.from(Mod_content));

const PL1_file = fs.readFileSync("../src/PL1SGKftANBR1skss6ssUcvXP3VxRKB4Adp2Ah6P6CG.json", 'utf-8');
const PL1_content = JSON.parse(PL1_file);
export const PL1 = Keypair.fromSecretKey(Uint8Array.from(PL1_content));

const PL2_file = fs.readFileSync("../src/PL2XDZDENuobcSGn1XSXbk3z5dT1hnb53cJfipqXtUz.json", "utf-8");
const PL2_content = JSON.parse(PL2_file)
export const PL2 = Keypair.fromSecretKey(Uint8Array.from(PL2_content));

const PL3_file = fs.readFileSync("../src/PL3fRTsAPqkgboG1GtVMm2bDK4UhRbjP4WapfAwN4LF.json", "utf-8");
const PL3_content = JSON.parse(PL3_file)
export const PL3 = Keypair.fromSecretKey(Uint8Array.from(PL3_content));

const PL4_file = fs.readFileSync("../src/PL4aYh2uKwShoJf5QSQUQZfjs7AeDRr85rTY8tBe8Rv.json", "utf-8");
const PL4_content = JSON.parse(PL4_file)
export const PL4 = Keypair.fromSecretKey(Uint8Array.from(PL4_content));

const PL5_file = fs.readFileSync("../src/PL5FTKumPGRB2cKJJ5sqxXpEZz9vf8SBeejfrD3LJYH.json", "utf-8");
const PL5_content = JSON.parse(PL5_file)
export const PL5 = Keypair.fromSecretKey(Uint8Array.from(PL5_content));

const PL6_file = fs.readFileSync("../src/PL64WAE6nNLUtTqgySsiSRmD2veg4dpE9NWiE1PKfUt.json", "utf-8");
const PL6_content = JSON.parse(PL6_file)
export const PL6 = Keypair.fromSecretKey(Uint8Array.from(PL6_content));


const PL7_file = fs.readFileSync("../src/PL7EAuFve2HhGWZCx5C9sb1b9UK64Eg967Ecubw6bdy.json", "utf-8");
const PL7_content = JSON.parse(PL7_file)
export const PL7 = Keypair.fromSecretKey(Uint8Array.from(PL7_content));

const PL8_file = fs.readFileSync("../src/PL8ECUyd74bx9VrJA9kMojwTN3xaVxxU8h8t9q3o7od.json", "utf-8");
const PL8_content = JSON.parse(PL8_file)
export const PL8 = Keypair.fromSecretKey(Uint8Array.from(PL8_content));

const PL9_file = fs.readFileSync("../src/PL9pTvrWeursZAwRHH4qnWbHL4FoAC2vKPjVYBze5uY.json", "utf-8");
const PL9_content = JSON.parse(PL9_file)
export const PL9 = Keypair.fromSecretKey(Uint8Array.from(PL9_content));

const P11_file = fs.readFileSync("../src/P11qCP9z4NwtVjFu39cgcPfcAD8dEpcFXWWpYkD7AKf.json", "utf-8");
const P11_content = JSON.parse(P11_file)
export const P11 = Keypair.fromSecretKey(Uint8Array.from(P11_content));

const P12_file = fs.readFileSync("../src/P12LyPLHcrDDETQnMdYwT2CGtETU6XxAUrPSM6Qz1oX.json", "utf-8");
const P12_content = JSON.parse(P12_file)
export const P12 = Keypair.fromSecretKey(Uint8Array.from(P12_content));





const FEE_file = fs.readFileSync("../src/FEEPu3ku9ZCCGCoRt4KwxcqLioG6Hvfh6WwgAJvcLh3y.json", "utf-8");
const FEE_content = JSON.parse(FEE_file)
export const FEE = Keypair.fromSecretKey(Uint8Array.from(FEE_content));
