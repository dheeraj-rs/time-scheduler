import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function TransactionDetailsModal({ 
  transactions, 
  isOpen, 
  onClose 
}: { 
  transactions: any[], 
  isOpen: boolean, 
  onClose: () => void 
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Transaction History</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4 space-y-4">
          {transactions.map((transaction) => (
            <Card key={transaction.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{transaction.type}</p>
                  <p className="text-sm text-muted-foreground">{transaction.date}</p>
                  {transaction.details && (
                    <p className="text-sm mt-2">{transaction.details}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-medium">AED {transaction.amount}</p>
                  <Badge 
                    variant={
                      transaction.status === 'success' ? 'default' : 
                      transaction.status === 'pending' ? 'secondary' : 'destructive'
                    }
                    className="mt-2"
                  >
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
} 