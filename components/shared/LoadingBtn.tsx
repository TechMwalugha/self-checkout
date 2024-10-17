'use client'

import { LoadingBtnInterface } from "@/interfaces";
import { Button } from "../ui/button";

export default function LoadingBtn({ loading, title, styles } : LoadingBtnInterface) {
    return (
        <Button
        type="submit"
        className={styles}
        disabled={loading}
        >
            {loading ?
            (<><svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                </svg>
                Processing...</>) : 
             title}
        </Button>
    )
}