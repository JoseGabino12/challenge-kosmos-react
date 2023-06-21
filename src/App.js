import React, { useState } from "react";
import { useImage } from "./hooks/useImage";
import Component from "./components/Component";

const App = () => {
  const [moveableComponents, setMoveableComponents] = useState([]);
  const [selected, setSelected] = useState(null);
  const { image } = useImage();

  const addMoveable = () => {
    // Create a new moveable component and add it to the array
    setMoveableComponents([
      ...moveableComponents,
      {
        id: Math.floor(Math.random() * Date.now()),
        top: 0,
        left: 0,
        width: 100,
        height: 100,
        color: image[Math.floor(Math.random() * image.length)],
        updateEnd: true
      },
    ]);
  };

  const removeMoveable = (id) => {
    // Filter out the moveable component that matches the id
    const updatedMoveables = moveableComponents.filter(
      (moveable) => moveable.id !== id
    );
    setMoveableComponents(updatedMoveables);
  }

  const updateMoveable = (id, newComponent, updateEnd = false, parent) => {
    console.log(moveableComponents)
    const updatedMoveables = moveableComponents.map((moveable, i) => {
      // Components should not drop out of div with id "parent" when dragging
      if (parent) {
        let parentBounds = parent?.getBoundingClientRect();
        
        if (moveable.id === id) {
          console.log(moveable)
          let newLeft = newComponent.left;
          let newTop = newComponent.top;
          if (newLeft < 0) {
            newLeft = 0;
          }
          if (newTop < 0) {
            newTop = 0;
          }
          if (newLeft + moveable.width > parentBounds.width) {
            newLeft = parentBounds.width - moveable.width;
          }
          if (newTop + moveable.height > parentBounds.height) {
            newTop = parentBounds.height - moveable.height;
          }
          return { id, ...newComponent, top: newTop, left: newLeft, updateEnd };
        }
      } else {
        if (moveable.id === id) {
          return { id, ...newComponent, updateEnd };
        }
      }
      return moveable;
    });
    setMoveableComponents(updatedMoveables);
  };

  const handleResizeStart = (index, e) => {
    const [handlePosX, handlePosY] = e.direction;
    if (handlePosX === -1) {
      const initialLeft = e.left;
      const initialWidth = e.width;

      return { initialLeft, initialWidth };
    }

    if (handlePosY === -1) {
      const initialTop = e.top;
      const initialHeight = e.height;

      return { initialTop, initialHeight };
    }

    if (handlePosX === 1) {
      const initialWidth = e.width;

      return { initialWidth };
    }

    if (handlePosY === 1) {
      const initialHeight = e.height;

      return { initialHeight };
    }
  };

  return (
    <main style={{ height : "100vh", width: "100vw" }}>
      <button className="button" onClick={addMoveable}>Add Moveable1</button>
      <div
        id="parent"
        style={{
          position: "relative",
          background: "black",
          height: "80vh",
          width: "80vw",
        }}
      >
        {moveableComponents.map((item, index) => (
          <Component
            {...item}
            key={index}
            updateMoveable={updateMoveable}
            handleResizeStart={handleResizeStart}
            setSelected={setSelected}
            isSelected={selected === item.id}
            removeMoveable={removeMoveable}
          />
        ))}
      </div>
    </main>
  );
};

export default App;

