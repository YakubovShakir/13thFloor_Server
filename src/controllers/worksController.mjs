import Work from "../models/workModel.mjs"

export const getWorks = async (req, res) => {
  try {
    console.log("Отдаю работу")
    const works = await Work.find({}).sort({ coins_price: 1 })
    if (works) res.status(200).send({ works })
  } catch (e) {
    console.log("Error while getWorks ", e)
  }
}
