# Ch.23 Particle Effect

In this chapter, we will add particle effects to notes.

## Particle Effect

Particle effect gives player a powerful visual feedback especially in response to player actions, which improves gameplay enjoyment drastically.

We are going to add a particle effect when a note is tapped, which can be done by calling `SpawnParticleEffect`.

```ts
// src/engine/data/scripts/notes.ts

const touch = And(
    // ...
    [
        // ...
        SpawnParticleEffect(
            ParticleEffect.NoteCircularTapCyan,
            -0.4,
            -1,
            -0.4,
            -0.2,
            0.4,
            -0.2,
            0.4,
            -1,
            0.3,
            false
        ),
    ]
)
```
