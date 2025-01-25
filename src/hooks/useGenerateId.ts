export default function useGenerateId():string{
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
    return id;
}