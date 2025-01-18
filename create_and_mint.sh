#!/bin/bash

# Check for required commands
if ! command -v solana &> /dev/null || ! command -v spl-token &> /dev/null; then
  echo "Error: Solana CLI and/or SPL Token CLI are not installed."
  exit 1
fi

# Exit on error
set -e

# Check if moderator wallet path is supplied
if [ -z "$1" ]; then
  echo "Usage: $0 <path-to-moderator-wallet>"
  exit 1
fi

# Variables
MODERATOR_WALLET=$1
DECIMALS=9
MINT_AMOUNT=1000000000000000  # Adjust as needed (e.g., 1,000,000 tokens)
RECIPIENTS=("PL1SGKftANBR1skss6ssUcvXP3VxRKB4Adp2Ah6P6CG" "PL2XDZDENuobcSGn1XSXbk3z5dT1hnb53cJfipqXtUz" "PL3fRTsAPqkgboG1GtVMm2bDK4UhRbjP4WapfAwN4LF" "PL4aYh2uKwShoJf5QSQUQZfjs7AeDRr85rTY8tBe8Rv" "PL5FTKumPGRB2cKJJ5sqxXpEZz9vf8SBeejfrD3LJYH" "PL64WAE6nNLUtTqgySsiSRmD2veg4dpE9NWiE1PKfUt" "PL7EAuFve2HhGWZCx5C9sb1b9UK64Eg967Ecubw6bdy" "PL8ECUyd74bx9VrJA9kMojwTN3xaVxxU8h8t9q3o7od" "PL9pTvrWeursZAwRHH4qnWbHL4FoAC2vKPjVYBze5uY" "P11qCP9z4NwtVjFu39cgcPfcAD8dEpcFXWWpYkD7AKf" "P12LyPLHcrDDETQnMdYwT2CGtETU6XxAUrPSM6Qz1oX" "FEEPu3ku9ZCCGCoRt4KwxcqLioG6Hvfh6WwgAJvcLh3y" "TSTFQQptFQAbFMVvEJLSZXMsHtTMcxy3bvRSvR9SHFE") # Replace with actual addresses
SEND_AMOUNT=1000000000000    # Amount to send to each recipient (adjust as needed)

# Check if the moderator wallet file exists
if [ ! -f "$MODERATOR_WALLET" ]; then
  echo "Error: Moderator wallet file not found at $MODERATOR_WALLET"
  exit 1
fi

# Set the Solana CLI to use the supplied moderator wallet
solana config set --keypair "$MODERATOR_WALLET"

# Step 1: Create a new token
echo "Creating a new token..."
TOKEN_MINT=$(spl-token create-token --decimals $DECIMALS | awk '/Creating token/ {print $3}')
if [ -z "$TOKEN_MINT" ]; then
  echo "Error: Failed to create token. Exiting."
  exit 1
fi
echo "Token created: $TOKEN_MINT"

# Step 2: Create an associated token account for the wallet
echo "Creating an associated token account for the moderator wallet..."
TOKEN_ACCOUNT=$(spl-token create-account "$TOKEN_MINT" | awk '/Creating account/ {print $3}')
if [ -z "$TOKEN_ACCOUNT" ]; then
  echo "Error: Failed to create associated token account. Exiting."
  exit 1
fi
echo "Token account created: $TOKEN_ACCOUNT"

# Step 3: Mint tokens to the wallet
echo "Minting tokens to the moderator wallet..."
spl-token mint "$TOKEN_MINT" "$MINT_AMOUNT" || {
  echo "Error: Failed to mint tokens. Exiting."
  exit 1
}
echo "Minted $MINT_AMOUNT tokens to $TOKEN_ACCOUNT"

# Step 4: Send tokens to 5 recipient addresses
for RECIPIENT in "${RECIPIENTS[@]}"; do
  echo "Sending $SEND_AMOUNT tokens to $RECIPIENT..."
  
  # Transfer tokens and fund the recipient's ATA if it doesn't exist
  spl-token transfer "$TOKEN_MINT" "$SEND_AMOUNT" "$RECIPIENT" --fund-recipient || {
    echo "Error: Failed to send tokens to $RECIPIENT. Exiting."
    exit 1
  }
  echo "Sent $SEND_AMOUNT tokens to $RECIPIENT"
done

echo "Token distribution completed successfully."
