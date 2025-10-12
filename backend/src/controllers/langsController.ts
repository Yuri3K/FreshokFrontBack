import {db} from '../config/firebaseAdmin'

const getLangs = async (req: any, res: any) => {
  try {
    const snapshot = await db.collection('langs').get()
    const langs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    res.json(langs);
  } catch (err) {
    console.log(err)
    res.status(500).send('Error fetching data')
  }
}

export default {
  getLangs
}