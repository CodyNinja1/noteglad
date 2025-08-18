var g_PressedKeys = {};

function Main()
{
    document.addEventListener("input", SaveToLocalStorage);

    let TextAreaElem = document.getElementById("textarea");

    let DocumentWidth = window.innerWidth;
    let DocumentHeight = window.innerHeight;

    let TextAreaWidth = DocumentWidth - 8;
    let TextAreaHeight = DocumentHeight - 10;

    TextAreaElem.style.setProperty("width", TextAreaWidth + "px");
    TextAreaElem.style.setProperty("height", TextAreaHeight + "px");
    TextAreaElem.style.setProperty("resize", "none");

    TextAreaElem.setAttribute('autocomplete', 'off');
    TextAreaElem.setAttribute('autocorrect', 'off');
    TextAreaElem.setAttribute('autocapitalize', 'off');
    TextAreaElem.setAttribute('spellcheck', false);
}

function GetSelectedText(TextAreaElem) 
{ 
    var StartIdx = TextAreaElem.selectionStart; 
    var EndIdx = TextAreaElem.selectionEnd; 
    return TextAreaElem.value.substring(StartIdx, EndIdx); 
}

function SetSelectedText(TextAreaElem, SelectionStart, SelectionEnd, TextToPut) 
{
    if (g_PressedKeys["Shift"])
    {
        navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
            if (result.state === "granted" || result.state === "prompt") 
            {
                navigator.clipboard.writeText(TextToPut);
            }
            else
            {
                console.log("clipboard blocked");
            }
        });
        return;
    }
    const TextAreaValue = TextAreaElem.value;
    
    TextAreaElem.value = 
        TextAreaValue.substring(0, SelectionStart) +
        TextToPut +
        TextAreaValue.substring(SelectionEnd);

    const NewCaretPos = SelectionStart + TextToPut.length;
    TextAreaElem.selectionStart = NewCaretPos;
    TextAreaElem.selectionEnd = NewCaretPos;
}

function LoadFromLocalStorage()
{
    let TextAreaElem = document.getElementById("textarea");
    TextAreaElem.value = localStorage.getItem("note");
}

function SaveToLocalStorage()
{
    let TextAreaElem = document.getElementById("textarea");
    localStorage.setItem("note", TextAreaElem.value);

    if (GetSelectedText(TextAreaElem) !== "")
    {
        HandleSelection(GetSelectedText(TextAreaElem));
    }
}

function HandleSelection(String)
{
    let TextAreaElem = document.getElementById("textarea");

    if ((String.match(/[0-9A-Fa-f]{2}/gm)?.length ?? 0) === 4)
    {
        if (String.includes(" "))
        {
            if (g_PressedKeys["Control"])
            {
                if (g_PressedKeys["l"] || g_PressedKeys["b"])
                {
                    let Bytes = String.split(" ");
                    if (g_PressedKeys["l"]) Bytes = Bytes.reverse();
                    SetSelectedText(TextAreaElem, TextAreaElem.selectionStart, TextAreaElem.selectionEnd, Bytes.join("")); 
                    SaveToLocalStorage();
                    return true;
                }
                if (g_PressedKeys["i"])
                {
                    let Bytes = String.split(" ");
                    Bytes = Bytes.reverse();
                    Bytes = Bytes.join("");
                    Bytes = parseInt(Bytes, 16);
                    SetSelectedText(TextAreaElem, TextAreaElem.selectionStart, TextAreaElem.selectionEnd, Bytes); 
                    SaveToLocalStorage();
                    return true;
                }
                
            }
        }
        else
        {
            if (g_PressedKeys["Control"])
            {
                if (g_PressedKeys["l"] || g_PressedKeys["b"])
                {
                    let Bytes = String;
                    if (Bytes.length < 8)
                    {
                        for (let ExtraZeros = 0; ExtraZeros < (8 - Bytes.length); ExtraZeros++)
                        {
                            Bytes = "0" + Bytes;
                        }
                    }
                    Bytes = Bytes[0] + Bytes[1] + " " + Bytes[2] + Bytes[3] + " " + Bytes[4] + Bytes[5] + " " + Bytes[6] + Bytes[7];
                    if (g_PressedKeys["l"]) Bytes = Bytes.split(" ").reverse().join(" ");
                    SetSelectedText(TextAreaElem, TextAreaElem.selectionStart, TextAreaElem.selectionEnd, Bytes); 
                    SaveToLocalStorage();
                    return true;
                }
                if (g_PressedKeys["i"])
                {
                    try
                    {
                        let Bytes = String;
                        Bytes = parseInt(Bytes, 16);
                        SetSelectedText(TextAreaElem, TextAreaElem.selectionStart, TextAreaElem.selectionEnd, Bytes); 
                        SaveToLocalStorage();
                        return true;
                    }
                    catch
                    {
                        return false;
                    }
                }
                if (g_PressedKeys["h"])
                {
                    try
                    {
                        let Bytes = String;
                        Bytes = parseInt(Bytes);
                        SetSelectedText(TextAreaElem, TextAreaElem.selectionStart, TextAreaElem.selectionEnd, Bytes.toString(16)); 
                        SaveToLocalStorage();
                        return true;
                    }
                    catch
                    {
                        return false;
                    }
                }
            }
        }
    }
    else
    {
        try
        {
            if (String.includes(" "))
            {
                if (g_PressedKeys["Control"])
                {
                    if (g_PressedKeys["l"] || g_PressedKeys["b"])
                    {
                        let Bytes = String.split(" ");
                        if (g_PressedKeys["l"]) Bytes = Bytes.reverse();
                        SetSelectedText(TextAreaElem, TextAreaElem.selectionStart, TextAreaElem.selectionEnd, Bytes.join("")); 
                        SaveToLocalStorage();
                        return true;
                    }
                    if (g_PressedKeys["i"])
                    {
                        let Bytes = String.split(" ");
                        Bytes = Bytes.reverse();
                        Bytes = Bytes.join("");
                        Bytes = parseInt(Bytes, 16);
                        SetSelectedText(TextAreaElem, TextAreaElem.selectionStart, TextAreaElem.selectionEnd, Bytes); 
                        SaveToLocalStorage();
                        return true;
                    }
                    
                }
            }
            else
            {
                if (g_PressedKeys["Control"])
                {
                    if (g_PressedKeys["l"] || g_PressedKeys["b"])
                    {
                        let Bytes = String;
                        if (Bytes.length < 8)
                        {
                            let Length = Bytes.length;
                            for (let ExtraZeros = 0; ExtraZeros < (8 - Length); ExtraZeros++)
                            {
                                Bytes = "0" + Bytes;
                            }
                        }
                        Bytes = Bytes[0] + Bytes[1] + " " + Bytes[2] + Bytes[3] + " " + Bytes[4] + Bytes[5] + " " + Bytes[6] + Bytes[7];
                        if (g_PressedKeys["l"]) Bytes = Bytes.split(" ").reverse().join(" ");
                        SetSelectedText(TextAreaElem, TextAreaElem.selectionStart, TextAreaElem.selectionEnd, Bytes); 
                        SaveToLocalStorage();
                        return true;
                    }
                    if (g_PressedKeys["i"])
                    {
                        try
                        {
                            let Bytes = String;
                            Bytes = parseInt(Bytes, 16);
                            SetSelectedText(TextAreaElem, TextAreaElem.selectionStart, TextAreaElem.selectionEnd, Bytes); 
                            SaveToLocalStorage();
                            return true;
                        }
                        catch
                        {
                            return false;
                        }
                    }
                    if (g_PressedKeys["h"])
                    {
                        try
                        {
                            let Bytes = String;
                            Bytes = parseInt(Bytes);
                            SetSelectedText(TextAreaElem, TextAreaElem.selectionStart, TextAreaElem.selectionEnd, Bytes.toString(16)); 
                            SaveToLocalStorage();
                            return true;
                        }
                        catch
                        {
                            return false;
                        }
                    }
                }
            }
        }
        catch (e)
        {
            console.error(e);
        }
    }
    return false;
}

window.onload = LoadFromLocalStorage;
window.addEventListener('resize', Main);
document.addEventListener('keyup', function(e) 
{
    let TextAreaElem = document.getElementById("textarea"); 
    g_PressedKeys[e.key.toLowerCase()] = false;
    if (GetSelectedText(TextAreaElem) !== "")
    {
        if (HandleSelection(GetSelectedText(TextAreaElem)))
        {
            e.preventDefault();
            e.stopPropagation();
        }
    }
});

document.addEventListener('keydown', function(e) 
{
    let TextAreaElem = document.getElementById("textarea"); 
    g_PressedKeys[e.key.toLowerCase()] = true; 
    if (GetSelectedText(TextAreaElem) !== "")
    {
        if (HandleSelection(GetSelectedText(TextAreaElem)))
        {
            e.preventDefault();
            e.stopPropagation();
        }
    }
});

Main();
