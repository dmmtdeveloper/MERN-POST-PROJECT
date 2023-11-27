export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body)
        res.status(201).json("created!")
        
    } catch (error) {
        next(error)
    }
}