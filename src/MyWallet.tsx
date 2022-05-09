import React from 'react';
import { useState } from 'react';
import {
    useAnchorWallet,
    useConnection,
    useWallet,
} from '@solana/wallet-adapter-react';
import { Connection, PublicKey, Keypair, clusterApiUrl, SystemProgram, Transaction } from '@solana/web3.js'
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import { show, create_auction_house, sell, buy, execute_sale } from './api/src/auction-house'
import { privateDecrypt } from 'crypto';
import { OutputFileType } from 'typescript';

const MyWallet: React.FC = () => {
    const { connection } = useConnection();
    let walletAddress = "";
    var AuctionAddress = "3EERzZ6dHvYKksjDuUECDTRNKENCw8NcN4LFFKj4C6th";


    // if you use anchor, use the anchor hook instead
    // const wallet = useAnchorWallet();
    // const walletAddress = wallet?.publicKey.toString();
    const wallet = useWallet();

    console.log("wallet details", { keypair: Keypair.generate().secretKey })

    function getShow() {

        show({ env: 'devnet', keypair: Keypair.generate().secretKey, auctionHouse: AuctionAddress }).then(x => {
            alert('Auction House: ' + x.auctionHouseKey +
                'Mint: ' + x.treasuryMint.toBase58() +
                'Authority: ' + x.authority.toBase58() +
                'Creator: ' + x.creator.toBase58() +
                'Fee Payer Acct:' + x.auctionHouseFeeAccount.toBase58() +
                'Treasury Acct: ' + x.auctionHouseTreasury.toBase58() +
                'Fee Payer Withdrawal Acct: ' + x.feeWithdrawalDestination.toBase58() +
                'Treasury Withdrawal Acct: ' + x.treasuryWithdrawalDestination.toBase58() +
                'Seller Fee Basis Points: ' + x.sellerFeeBasisPoints +
                'Requires Sign Off: ' + x.requiresSignOff +
                'Can Change Sale Price: ' + x.canChangeSalePrice +
                'AH Bump: ' + x.bump +
                'AH Fee Bump: ' + x.feePayerBump +
                'AH Treasury Bump: ' + x.treasuryBump);
            AuctionAddress = x.auctionHouseKey
        });
    }

    function getCreateauctionhouse() {
        create_auction_house({ env: 'devnet', sfbp: 1000, ccsp: false, rso: false, keypair: Keypair.generate().secretKey }).then(x => {
            alert('Auction House Address: ' + x)
            AuctionAddress = x
        })
    }

    function getSell() {
        
        sell({ auctionHouse: AuctionAddress, buyPrice: price, mint: mintAddress, tokenSize: '1', env: 'devnet', keypair: Keypair.generate().secretKey }).then(x => {
            alert('Create Sell Action'+'Account'+x.account+'MintAddress'+x.mintAddress+'Price'+x.price);
        })
    }

    function getExecuteSale() {
        alert('Execute Sale');
        execute_sale({ auctionHouse: AuctionAddress, buyPrice: price, mint: mintAddress, tokenSize: '1', buyerWallet: '3DikCrEsfAVHv9rXENg2Hdmc16L71EjveQEF4NbSfRak', sellerWallet: 'CCJC2s8FDGAs8GqmngE9gviusEuNnkdUwchcYMZ8ZmHB', env: 'devnet', keypair: Keypair.generate().secretKey })
    }

    function getBuy() {
        buy({ vauctionHouse: AuctionAddress, buyPrice: price, tokenSize: '1', mint: mintAddress, env: 'devnet', keypair: Keypair.generate().secretKey }).then(x => {
            alert('Buy / offer Action'+'Offer: '+x);
        })
    }

    if (wallet.connected && wallet.publicKey) {
        walletAddress = wallet.publicKey.toString()
    }

    const [price, setInput] = useState(''); // '' is the initial state value
    const [mintAddress, setInput2] = useState(''); // '' is the initial state value

    return (
        <>
            {wallet.connected &&
                <p>Your wallet is {walletAddress}</p> ||
                <p>Hello! Click the button to connect</p>
            }

            <div className="multi-wrapper">
                <span className="button-wrapper">
                    <WalletModalProvider>
                        <WalletMultiButton />
                    </WalletModalProvider>
                </span>
                {wallet.connected && <WalletDisconnectButton />}
            </div>

            <div>
                <button onClick={getCreateauctionhouse}>Create Auction House</button>
                <p>Your Auction House Address : {AuctionAddress}</p>
                <button >Update Auction House</button></div>
            <div>       <label>Get Details About Auction House with Address : 
                <input type="text" value={AuctionAddress}    />
            </label>               <button onClick={getShow} >Show</button> </div>
            <br></br><br></br><br></br><p>Tools:</p><p>Place An Offer: </p><div>  <label>Auction House Address:
                <input type="text" value={AuctionAddress} />
            </label>
            <label>Mint address:
                    <input type="text" value={mintAddress} onInput={e => setInput2((e.target as HTMLTextAreaElement).value)}/>
                </label>
                <label>Price:
                    <input type="number" value={price} onInput={e => setInput((e.target as HTMLTextAreaElement).value)} />
                </label>        <button onClick={getBuy}>Buy / Offer</button> </div>
            <br></br><p>Sell NFT:</p>
            <div>
                <label>Auction House Address:
                    <input type="text" value={AuctionAddress} />
                </label>
                <label>Mint address:
                    <input type="text" value={mintAddress} onInput={e => setInput2((e.target as HTMLTextAreaElement).value)} />
                </label>
                <label>Price:
                    <input type="number" value={price} onInput={e => setInput((e.target as HTMLTextAreaElement).value)}/>
                </label>
                <button onClick={getSell}>Sell</button>
            </div>
            <br></br>
            <div>
            <label>Current Price:
                    <input readOnly type="number" value={price} onInput={e => setInput((e.target as HTMLTextAreaElement).value)}/>
                </label><button onClick={getExecuteSale}>Execute_Sale</button></div>
            <div>
                { }
            </div>
            <br></br>
            <p>Other Functions: </p>
            <div>
                <button>Withdraw</button>
                <button>Show Escrow</button>
                <button>Withdraw From Treasury</button>
                <button>Withdraw From Fees</button>
                <button>Deposit</button>
                <button>Cancel</button>
            </div>
            <br></br>

        </>
    );
};

export default MyWallet;
