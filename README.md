# Ch.05 Pointers

In this chapter, we will go over pointers in Sonolus.js.

## Blocks in Sonolus

In Sonolus, blocks are continuous memories that hold values.

For example, Level Data block holds values such as current level time at 0th, delta time at 1st, screen aspect ratio at 2nd, etc.

Each block has an identifier, for Level Data block it's `1`.

In Sonolus nodes, to access and modify block values you would use `Get` and `Set` functions.

```ts
Get(1, 0)
Set(1, 0, 5)
```

However as you can tell, coding this way has really poor readability, so instead we use pointers in Sonolus.js.

## Pointers in Sonolus.js

Pointers as name suggests, is a location that points to a block value.

Sonolus.js contains pointer definitions for all blocks already, which points to their 0th value, for example `LevelData`.

```ts
// src/test.ts

console.log(visualize(LevelData))

// Result:
// Get(1, 0)
```

You may have noticed that `LevelData` does not have a data type so while the 0th value of Level Data block is the current level time which is a `number` type, we cannot use it directly if we want to do numerical operations with it.

Instead, we can use `.to()` generic method to specify a type.

```ts
// src/test.ts

const time = LevelData.to<number>(0)

console.log(visualize(Add(time, 1)))

// Result:
// Add(Get(1, 0), 1)
```

You may also have noticed that `.to()` accepts an offset parameter, which shifts along the block.

So if we shift 2 positions along Level Data block we will arrive at 2nd value, which holds screen aspect ratio.

```ts
// src/test.ts

const screenAspectRatio = LevelData.to<number>(2)

console.log(visualize(screenAspectRatio))

// Result:
// Get(1, 2)
```

## Built-in Pointer Definitions

In practice, we rarely need to do the above for most blocks.

Just like we already have block definitions like `LevelData`, Sonolus.js also provides pointer definitions like `Time` which you can simply import and use.

```ts
// src/test.ts

console.log(visualize(Add(Time, 1)))

// Result:
// Add(Get(1, 0), 1)
```

## Helpers for Special Blocks

There are also helper classes and functions provided to special blocks like Level UI block to further simplify our code.

```ts
// src/test.ts

console.log(
    visualize(
        UIMenu.set(
            Subtract(0.05, ScreenAspectRatio),
            0.95,
            0,
            1,
            0.15,
            0.15,
            0,
            1,
            HorizontalAlign.Center,
            VerticalAlign.Middle,
            true
        )
    )
)

// Result:
// Execute(
//     Set(5, 0, Subtract(0.05, Get(1, 2))),
//     Set(5, 1, 0.95),
//     Set(5, 2, 0),
//     Set(5, 3, 1),
//     Set(5, 4, 0.15),
//     Set(5, 5, 0.15),
//     Set(5, 6, 0),
//     Set(5, 7, 1),
//     Set(5, 8, 0),
//     Set(5, 9, 0),
//     Set(5, 10, 1)
// )
```

## Entity Info and Entity Info Array Block

Entity Info Array block provides an array of entity information for all entities in the level, while Entity Info block provides that but only for the current entity.

You can think of Entity Info block as a view into partial Entity Info Array block.

To access Entity Info block, you can simply use `EntityInfo`.

To access Entity Info block of another entity, you can use the `.of()` function with entity index (which will access the corresponding location in Entity Info Array block)

```ts
// src/test.ts

console.log(visualize([EntityInfo.state, EntityInfo.of(5).state]))

// Result:
// Execute(Get(20, 2), GetShifted(10, 2, Multiply(3, 5)))
```

## Entity Data and Entity Shared Memory Block

Similar to Entity Info block, these blocks also have paired array variant for accessing corresponding values of other entities.

However, unlike Entity Info block which has a defined data structure, Entity Data and Entity Shared Memory block's structures are user defined.

To allow developers to define their data structures and ease of access later, we can declare a class which contains data accessors.

For example, we declare that 0th value holds time of the entity, and 1st value holds whether the entity is silent or not.

```ts
// src/test.ts

class EntityDataPointer extends Pointer {
    public get time() {
        return this.to<number>(0)
    }

    public get isSilent() {
        return this.to<boolean>(1)
    }
}
```

With this, we can now use `createEntityData` helper function to create it.

```ts
// src/test.ts

const EntityData = createEntityData(EntityDataPointer)
```

Finally, we can now use it just like Entity Info block.

```ts
// src/test.ts

console.log(visualize([EntityData.isSilent, EntityData.of(5).isSilent]))

// Result:
// Execute(Get(22, 1), GetShifted(11, 1, Multiply(32, 5)))
```
