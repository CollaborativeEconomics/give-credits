'use client';

export default function TestComponent() {
    console.log('Test Component')
    setTimeout(() => {throw new Error('crash')}, 1000)
    return <div>Test Component</div>;
}