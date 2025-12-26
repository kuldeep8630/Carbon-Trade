🌱 Carbon-Trade
Decentralized Carbon Credit Verification and Trading Platform
📌 Overview

Carbon-Trade is a decentralized web application designed to verify, tokenize, trade, and retire carbon credits using blockchain technology.
The platform eliminates issues present in traditional carbon markets such as double counting, lack of transparency, centralized control, and fraudulent credits.

By leveraging smart contracts, IPFS, and Supabase, Carbon-Trade ensures trustless verification, immutable records, and peer-to-peer trading of carbon credits.

This project is developed as a major academic project / research-oriented blockchain application and also serves as a production-grade portfolio project.

🎯 Key Objectives

Transparent carbon credit lifecycle tracking

Decentralized verification & issuance

Secure peer-to-peer trading

Immutable storage of verification documents

Wallet-based authentication

Credit retirement to prevent reuse

🏗️ System Architecture
User (Browser)
   │
   │  React + TypeScript (Vite)
   ▼
Frontend UI  ───── Wallet (MetaMask)
   │
   │ API Calls
   ▼
Supabase (Auth + DB)
   │
   │ Metadata Hashes
   ▼
IPFS (via Pinata)
   │
   │ Smart Contract Calls
   ▼
Polygon / Ethereum Blockchain
   │
   └── CarbonCredit.sol

🔁 Carbon Credit Lifecycle

Project Registration – Carbon project details submitted

Verification – Verified authority validates project

Tokenization – Carbon credits minted as blockchain tokens

Marketplace Trading – Credits traded P2P

Retirement – Credits permanently retired after use

🧩 Core Features
🔐 Authentication

Wallet-based authentication

Supabase user management

Protected routes for authorized users

📄 Verification & Tokenization

Verified carbon projects only

Smart contract–controlled issuance

Immutable metadata stored on IPFS

🛒 Marketplace

List carbon credits for sale

Buy credits directly using wallet

Transparent on-chain transactions

♻️ Credit Retirement

Prevents double usage of credits

Retirement permanently recorded on blockchain

🛠️ Tech Stack
Frontend

React (TypeScript)

Vite

Tailwind CSS

Ethers.js

Blockchain

Solidity

Ethereum / Polygon

MetaMask

Backend / Services

Supabase (Auth + Database)

IPFS (Pinata)

Tooling

Vite

TypeScript

ESLint

Git & GitHub
