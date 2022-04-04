import styled from "@emotion/styled";
import { AnimatePresence, motion, useSpring, useTransform } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import { Card } from "./card";
import "./styles.css";

type meme = {
  id: string;
  src: string;
}

const Frame = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`
export var Stack = function() {
  const pop = (array: any[]) => array.filter((_, idx) => idx !== array.length - 1)

  const backgroundTransformer = useSpring(0, {
    damping: 10000,
    mass: 0.01
  });

  const background = useTransform(
    backgroundTransformer,
    [-50, 0, 50],
    [
      "linear-gradient(90deg, rgba(255,145,145,1) 0%, rgba(255,145,145,0) 50%, rgba(15,15,15,0) 100%)",
      "linear-gradient(90deg, rgba(15,15,15,0) 0%, rgba(15,15,15,0) 50%, rgba(15,15,15,0) 100%)",
      "linear-gradient(90deg, rgba(15,15,15,0) 0%, rgba(126,255,99,0) 50%, rgba(126,255,99,1) 100%)"
    ]
  );

  const getNextItems = (n = 3): Promise<meme[]> =>
    fetch(`https://meme-api.herokuapp.com/gimme/${n}`)
      .then(response => response.json())
      .then(json => json.memes.map((meme: { url: string }) => ({
            id: meme.url,
            src: meme.url
          })));

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<meme[]>([]);

  useEffect(() => {
    if (items.length < 3) {
      getNextItems().then((newItems) => {
        const val = [...items, ...newItems];
        console.log(val)
        setItems(val);

        if (loading) {
          setLoading(false);
        }

      }).catch(err => console.error(err));
    }
  });

  const handleRemoveItem = () => {
    setItems(items.slice(1));
  };

  const displayItems = items.slice(0, 2);
  const activeItem = displayItems[0];

  displayItems.reverse();

  if (loading) {
    return (<div>Loading..</div>)
  }

  return (
      <motion.div className="dash">
        <AnimatePresence>
          {displayItems.map((item: meme) => {
            console.log("in return", item)
            return (
              <Card
                key={item.id}
                src={item.src}
                isActive={item === activeItem}
                onRemove={handleRemoveItem}
                backgroundTransformer={backgroundTransformer}
              />
            );
          })}
        </AnimatePresence>
      </motion.div>
  )
}
