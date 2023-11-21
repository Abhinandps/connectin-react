export const ContentWithTags = ({ contentBody }: any) => {
    // Regular expression to find #tags in the text
    const tagRegex = /#(\w+)/g;

    // Split the contentBody into parts separated by #tags
    const parts = contentBody.split(tagRegex);



    return (
        <p className="font-light leading-6 text-[12px] py-2">
            {parts.map((part: any, index: any) => {


                console.log(part, tagRegex);
                // if (part.match(tagRegex)) {
                // console.log(tagRegex);

                // If it's a #tag, render it as a clickable link
                const tag = part.replace('#', '');
                return (
                    <a key={index} href={`/tags/${tag}`} className="text-blue-800 font-medium underline">
                        #{tag}
                    </a>
                );
                // } else {
                // If it's not a #tag, render it as plain text
                // return <span key={index}>{part}</span>;
                // }
            })}
        </p>
    );
};