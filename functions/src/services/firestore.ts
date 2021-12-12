import { firestore } from "firebase-admin";

export default class FirestoreService<T> {
    private collection: firestore.CollectionReference;
    private db: firestore.Firestore;

    constructor(collection: string) {
        this.db = firestore();
        this.collection = this.db.collection(collection);
    }

    public async get(id: string) {
        const snapshot = await this.collection.doc(id).get();

        return snapshot.data();
    }

    public async getAll() {
        const snapshot = await this.collection.get();

        return snapshot.docs;
    }

    public create(doc: T) {
        return this.collection.add(doc);
    }

    public createAll(docs: T[]) {
        docs.forEach((doc) => {
            // Delay write operation as the limit on Firebase is 10,000 writes/seconds.
            setTimeout(() => this.create(doc), 1);
        });
    }

    public update(id: string, doc: T) {
        return this.collection.doc(id).update(doc);
    }

    public remove(id: string) {
        return this.collection.doc(id).delete();
    }
}
