import weaviate from 'weaviate-ts-client';
import schema from 'weaviate-ts-client/types/schema';

const client = weaviate.client({
  scheme: 'http',
  host: 'localhost:8080',
});

const schemaRes = await client.schema.getter().do();

const schemaConfig = {
  'class': 'Meme',
  'vectorizer': 'img2vec-neural',
  'vectorIndexType': 'hnsw',
  'moduleConfig': {
    'img2vec-neural': {
      'imageFields': [
        'image'
      ]
    }
  },
  'properties': [
    {
      'name': 'image',
      'dataType': ['blob'],
    },
    {
      'name': 'text',
      'dataType': ['string'],
    }
  ]
}

await client.schema
      .classCreator()
      .withClass(schemaConfig)
      .do();

      const img = readFileSync('./img/hi-mom.jpg');

      const b64 = Buffer.from(img).toString('base64')

      const res = await client.data.creator()
          .withClassName('Meme')
          .withProperties({
            image: b64,
            text: 'matrix meme'
          })

          .do();