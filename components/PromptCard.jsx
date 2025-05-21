"use Client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";

const PromptCard = ( {post, handleTagClick, handleEdit, handleDelete}) => {
  const [copied, setCopied] = useState("");
  const { data: session} = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() =>
      setCopied(""),3000);
  }

  return (
    <div className="prompt_card mb-3">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Link href={`/profile/${post.creator._id}`}>
          <Image 
          src={post.creator.image ? post.creator.image : '/assets/icons/user.png'}
          alt="user_image"
          width={40}
          height={40}
          className="rounded-full object-contain"
          />
          </Link>

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900 custom-font f-14">{post.creator?.username}</h3>
            <p className="font-inter text-sm text-gray-500 custom-font f-13">{post.creator?.email}</p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
          alt="copy"
          width={12}
          height={12}/>
        </div>

        {session?.user.id === post.creator._id && pathName === '/profile' && (
          <div className="copy_btn" onClick={handleEdit}>
            <Image src={'/assets/icons/pencil.png'}
              width={12}
              height={12} />
          </div>
        )}

        {session?.user.id === post.creator._id && pathName === '/profile' && (
          <div className="copy_btn" onClick={handleDelete}>
              <Image src={'/assets/icons/bin.png'}
                width={12}
                height={12} />
          </div>
        )}

      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700 custom-font f-15">{post.prompt}</p>
      <p className="font-inter text-sm blue_gradient cursor-pointer custom-font f-15" onClick={() => handleTagClick && handleTagClick(post.tag) }>{post.tag}</p>
    
    </div>
  )
}

export default PromptCard