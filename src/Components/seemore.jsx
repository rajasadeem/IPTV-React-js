import React, { useEffect, useRef, useState } from "react";

const SeeMore = ({ data }) => {
    const [Show, setShow] = useState(false);
    const [Hidden, setHidden] = useState(false);
    const ref = useRef();

    useEffect(() => {
        let ele = ref.current;
        let total_lines = Math.floor(ele.offsetHeight / window.getComputedStyle(ele).lineHeight.replace('px', ''));
        if (total_lines >= 2) {
            setHidden(false);
            setShow(true)
        } else {
            setHidden(true)
        }
    }, [data])

    return (
        <>
            <p ref={ref} className={`${Show && 'line-clamp-4'}`}>{ Show ? data?.substring(0, 200) : data}</p>
            {
                !Hidden && <p>
                    <span className={`text-[#562A83] underline cursor-pointer`} onClick={() => {
                        setShow(!Show)
                    }}>
                        {
                            Show ? 'Read More' : 'See Less'
                        }
                    </span>
                </p>
            }
        </>
    )
}

export default SeeMore