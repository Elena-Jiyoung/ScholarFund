# ScholarFund - Decentralized Scholarship Platform

## Overview
ScholarFund is a decentralized application that revolutionizes the scholarship funding process using blockchain technology. It enables transparent, secure, and efficient management of scholarship funds through smart contracts.

## Tech Stack
- **Frontend**: Next.js, React, Styled Components
- **Backend**: Solidity, Thirdweb
- **Blockchain**: Ethereum
- **Storage**: IPFS (via web3.storage)
- **Authentication**: Thirdweb Wallet Connect
- **Deployment**: Vercel

## Features
1. **Wallet Authentication**
   - Secure wallet connection using Thirdweb
   - Role-based access control (Admin, Scholar, Donor)

2. **Smart Contract Interactions**
   - Read Operations:
     - View scholarship applications
     - Check funding progress
     - View milestone status
   - Write Operations:
     - Submit scholarship applications
     - Create and approve milestones
     - Donate to scholars

3. **User Roles**
   - **Students**: Apply for scholarships, track progress
   - **Donors**: Contribute to scholarships
   - **Admins**: Review applications, manage milestones

## Project Structure
```
scholar-fund/
├── components/
│   ├── Layout/
│   ├── Styles/
│   └── UI/
├── contracts/
│   └── ScholarFund.sol
├── hooks/
│   └── useScholarFundThirdWeb.js
├── lib/
│   └── ipfsService.js
├── pages/
│   ├── admin/
│   ├── scholar/
│   └── index.js
└── utils/
    └── format.js
```

## Smart Contract Features
- Scholarship application management
- Milestone tracking
- Fund distribution
- Role-based access control
- Gas-efficient operations

## Getting Started
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Run development server: `npm run dev`

## Environment Variables
```env
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_client_id
NEXT_PUBLIC_THIRDWEB_SECRET_KEY=your_secret_key
```

## Deployment
- Frontend: Deployed on Vercel
- Smart Contract: Deployed on Ethereum testnet
- IPFS: Using web3.storage

## Demo Video Outline (3 minutes)
1. **Introduction (30s)**
   - Project overview
   - Problem statement
   - Solution approach

2. **Frontend & UI/UX (45s)**
   - Showcase responsive design
   - Demonstrate user flows
   - Highlight UI improvements
   - Component structure explanation

3. **Backend & Blockchain (45s)**
   - Smart contract functionality
   - Wallet authentication demo
   - Read/write operations
   - IPFS integration

4. **Technical Decisions (30s)**
   - Tech stack choices
   - Architecture decisions
   - Security considerations

5. **Live Demo (30s)**
   - End-to-end workflow
   - Real transactions
   - User role demonstrations

## Rubric Coverage
### Frontend (Checkpoint 1)
- ✅ 3+ navigable pages
- ✅ Modern UI design
- ✅ React Hooks implementation
- ✅ Component structure
- ✅ User flow design

### Backend
- ✅ Wallet authentication
- ✅ Smart contract reads (2+)
- ✅ Smart contract writes (2+)
- ✅ Gas-efficient smart contract
- ✅ Comprehensive documentation

### Organization
- ✅ Meaningful Git commits
- ✅ Consistent code structure
- ✅ Clear variable naming
- ✅ Code documentation
- ✅ Component comments

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
MIT License

## W3 CLI for Students Uploading Milestones Proof on IPFS
I referred to this documentation: https://docs.storacha.network/w3cli/#create-your-first-space.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
