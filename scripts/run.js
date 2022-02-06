const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners()
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal")
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  })
  await waveContract.deployed()
  console.log("address: ", waveContract.address)
  console.log("contract deployed by:", owner.address);

  let contractBalance = await hre.ethers.provider.getBalance(waveContract.address)
  console.log("Contract balance: ", hre.ethers.utils.formatEther(contractBalance))
  let waveCount;
  waveCount = await waveContract.getTotalWaves();

  let waveTxn = await waveContract.wave("wow epic!");
  await waveTxn.wait()

  waveCount = await waveContract.getTotalWaves()

  waveTxn = await waveContract.connect(randomPerson).wave("so cool epic!");
  await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves();
  let allWaves = await waveContract.getAllWaves();
  console.log(allWaves)

  contractBalance = await hre.ethers.provider.getBalance(waveContract.address)
  console.log("Contract balance: ", hre.ethers.utils.formatEther(contractBalance))

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
