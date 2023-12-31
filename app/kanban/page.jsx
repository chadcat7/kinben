'use client'
import { useEffect, React, useState } from "react";
import { redirect } from "next/navigation";
import { UserAuth } from "../context/AuthContext";
import { useTodoContext } from "../context/TodoContext";
import {
  DndContext,
  DragOverlay,
} from "@dnd-kit/core";
import { SortableContext, } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import Column from "./Column";
import Taskcard from "./Taskcard";
const TodoPage = () => {
  const [mounted, setMounted] = useState(false);
  const { activeTask, activeCol, sensors, onDragOver, onDragEnd, onDragStart, columnsId, columns, tasks } = useTodoContext()
  const { user } = UserAuth()
  useEffect(() => {
    if (!user) {
      redirect("/")
    }
    setMounted(true)
  }, [user])
  return <div className="p-16 flex justify-center min-h-content items-center" style={{ flex: "1 1 auto" }}>
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <div className="m-auto flex gap-4">
        <div className="flex gap-4 flex-wrap justify-center mb-16">
          <SortableContext items={columnsId}>
            {columns.map((col) => (
              <Column
                key={col.id}
                column={col}
                tasks={tasks.filter((task) => task.columnId === col.id)}
              />
            ))}
          </SortableContext>
        </div>
      </div>

      {mounted ? createPortal(
        <DragOverlay>
          {activeCol && (
            <Column
              column={activeCol}
              tasks={tasks.filter(
                (task) => task.columnId === activeCol.id
              )}
            />
          )}
          {activeTask && (
            <Taskcard
              task={activeTask}
              column={activeCol}
            />
          )}
        </DragOverlay>,
        document.body
      ) : null}
    </DndContext>
  </div>
}


export default TodoPage
