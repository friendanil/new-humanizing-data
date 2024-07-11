import { Concept, MakeTheInstanceConcept, SyncData } from "mftsccs-browser";
import { CreateConnectionBetweenEntity } from "./entity.service";

export async function createEntityInstance(
  entityType: string,
  userId: number,
  conepts: any
) {
  const entityConcept = await MakeTheInstanceConcept(
    `the_${entityType}`,
    "",
    true,
    userId,
    4,
    999
  );

  console.log("entityConcept ->", entityConcept);

  for (const [key, value] of Object.entries(conepts)) {
    let ObjKey = key;

    const keyConcept: Concept = await MakeTheInstanceConcept(
      `${ObjKey}`,
      `${value}`,
      false,
      userId,
      4,
      999
    );
    await CreateConnectionBetweenEntity(entityConcept, keyConcept, ObjKey);
  }

  await SyncData.SyncDataOnline();
  console.log("entityConcept ID ->", entityConcept?.id);
  return entityConcept;
}
