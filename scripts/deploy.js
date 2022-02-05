const main = async () => {
  const [deployer] = await hre.ethers.getSigners()
  const accountBalance = await deployer.getBalance()

  console.log("depoying contracts with account: ", deployer.address)
  console.log("Account baalnce: ", accountBalance.toString())

  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal")
  const waveContract = await waveContractFactory.deploy()
  await waveContract.deployed()

  console.log("address: ", waveContract.address)
}

const run = async () => {
  try {
    await main()
    process.exit(0)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

run()
