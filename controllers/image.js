const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '1e1046a720094ce39ef3f5fa1ff1492f'
});

const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('something went wrong with api call'))

}


const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => response.status(400).json('unable to get entries'));
}

module.exports = {
    handleImage,
    handleApiCall
}