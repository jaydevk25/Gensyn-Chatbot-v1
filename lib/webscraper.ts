interface ScrapedData {
  content: string
  source: string
}

// Knowledge base split by topic
const GENSYN_KNOWLEDGE: { [topic: string]: { content: string; source: string } } = {
  overview: {
    content: `
Gensyn is a decentralized network connecting global computing resources for trustless, cost-efficient AI training. 
It enables anyone to train or fine-tune deep learning models without centralized intermediaries.
    `,
    source: 'https://www.gensyn.ai',
  },
  principles: {
    content: `
Core Principles:
- Decentralization: Peer-to-peer AI training without central authority.
- Trustless Verification: Computation verified cryptographically.
- Scalability: Parallelizes training across global hardware.
- Incentive Alignment: $GENS tokens reward compute and verification.
- Privacy: Supports encrypted datasets and secure mapping layers.
    `,
    source: 'https://www.gensyn.ai',
  },
  technology: {
    content: `
Key Technologies:
- SAPO: Asynchronous reinforcement learning with shared rollouts.
- Judge: Decentralized task scheduler and monitor.
- RL Swarm: Collaborative peer-to-peer RL system.
- Verde: Verification framework for untrusted nodes.
- Graph-based Pinpoint Protocol: Multi-granular verification.
- Truebit-style Incentive Game: Ensures honest participation.
    `,
    source: 'https://www.gensyn.ai',
  },
  participants: {
    content: `
Participants:
- Submitters: Provide tasks, model, and data.
- Solvers: Train models and generate proofs-of-learning.
- Verifiers: Validate Solvers’ proofs.
- Whistleblowers: Challenge Verifiers’ work for rewards.
    `,
    source: 'https://www.gensyn.ai',
  },
  workflow: {
    content: `
Protocol Workflow:
1. Task Submission
2. Profiling
3. Training
4. Proof Generation
5. Verification
6. Graph-based Challenges
7. Contract Arbitration
8. Settlement
    `,
    source: 'https://www.gensyn.ai',
  },
  cost: {
    content: `
Cost Efficiency:
- Low-cost compute (~$0.40/hr for V100-equivalent), cheaper than AWS/GCP.
- Open marketplace with fair pricing determined by market dynamics.
    `,
    source: 'https://www.gensyn.ai',
  },
  governance: {
    content: `
Governance & Development:
- Gensyn Limited: Initial development and IP management.
- Gensyn Foundation: Post-TGE governance via elected council.
- Development Phases: Testnet → Canarynet (Kusama) → Mainnet (Polkadot).
    `,
    source: 'https://docs.gensyn.ai',
  },
  research: {
    content: `
Research Focus:
- Probabilistic verification of ML training
- Pinpoint verification on-chain
- Parallelization of ML models across heterogeneous hardware
    `,
    source: 'https://docs.gensyn.ai',
  },
  vision: {
    content: `
Long-Term Vision:
- Decentralized, globally-owned foundation models.
- Anyone can train or fine-tune ML models.
- Bridges ML silos for collaborative AI development.
- Provides Web3-native ML infrastructure reducing reliance on Web2 providers.
    `,
    source: 'https://www.gensyn.ai',
  },
}

export async function scrapeWebsiteContent(query: string): Promise<string> {
  try {
    query = query.toLowerCase()

    // Map keywords to knowledge topics
    const topicMap: { [key: string]: string } = {
      overview: 'overview',
      mission: 'overview',
      principles: 'principles',
      core: 'principles',
      tech: 'technology',
      technology: 'technology',
      participants: 'participants',
      workflow: 'workflow',
      steps: 'workflow',
      process: 'workflow',
      cost: 'cost',
      price: 'cost',
      governance: 'governance',
      research: 'research',
      vision: 'vision',
      future: 'vision',
    }

    // Find topic based on query keywords
    const topicKey = Object.keys(topicMap).find((k) => query.includes(k))
    const topic = topicKey ? topicMap[topicKey] : 'overview'

    const data = GENSYN_KNOWLEDGE[topic]

    return `Source: ${data.source}\n\n${data.content}`
  } catch (error) {
    console.error('Error fetching Gensyn knowledge:', error)
    return 'Unable to fetch content.'
  }
}
