import { createEntityData, Pointer, visualize } from 'sonolus.js'

class EntityDataPointer extends Pointer {
    public get time() {
        return this.to<number>(0)
    }

    public get isSilent() {
        return this.to<boolean>(1)
    }
}

const EntityData = createEntityData(EntityDataPointer)

console.log(visualize([EntityData.isSilent, EntityData.of(5).isSilent]))
